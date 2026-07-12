import { useCallback, createContext, useContext, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { items, categories, rarities, type categoryType, type rarityType } from "../../../Data/ItemsData";
import type { item } from "../../../Data/ItemsData";

import CreditIcon from "../../../assets/Miscellaneous/Credits.svg?react"

import Dropdown from "../../Functions/Dropdown/Dropdown"
import "./ItemsTab.css";

interface Filters {
    category: categoryType | "All";
    rarity: rarityType | "All";
}

const defaultFilters: Filters = {
    category: "All",
    rarity: "All",
};

const sortedItems = items.toSorted((a, b) => a.name.localeCompare(b.name));

const SCRAMBLE_CHARS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
const DECRYPT_DURATION_MS = 1000;
const DecryptAllContext = createContext(0);

const randomChar = () =>
    SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

function Spoiler({ children }: { children?: React.ReactNode }) {
    const [revealed, setRevealed] = useState(false);
    const [decrypting, setDecrypting] = useState(false);
    const [chars, setChars] = useState<string[]>([]);
    const idleIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
    const charIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
    const charTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const decryptAllSignal = useContext(DecryptAllContext);
    const prevSignalRef = useRef(decryptAllSignal);

    const originalText = typeof children === "string" ? children : "";

    const clearIdleTimers = () => {
        idleIntervalsRef.current.forEach(clearInterval);
        idleIntervalsRef.current = [];
    };

    const clearDecryptTimers = () => {
        charIntervalsRef.current.forEach(clearInterval);
        charTimeoutsRef.current.forEach(clearTimeout);
        charIntervalsRef.current = [];
        charTimeoutsRef.current = [];
    };

    // Idle scramble before click — each character flickers on its own independent interval
    useEffect(() => {
        if (revealed || decrypting) return;

        const letters = originalText.split("");
        setChars(letters.map((ch) => (ch === " " ? " " : randomChar())));

        letters.forEach((ch, i) => {
            if (ch === " ") return;

            const scrambleSpeed = 60 + Math.random() * 50; // 60-110ms, each char its own rate
            const interval = setInterval(() => {
                setChars((prev) => {
                    const next = [...prev];
                    next[i] = randomChar();
                    return next;
                });
            }, scrambleSpeed);
            idleIntervalsRef.current.push(interval);
        });

        return () => clearIdleTimers();
    }, [revealed, decrypting, originalText]);


    const startDecrypt = () => {
        if (revealed || decrypting) return;
        setDecrypting(true);
        clearIdleTimers();

        const letters = originalText.split("");
        let lockedCount = 0;

        letters.forEach((ch, i) => {
            if (ch === " ") {
                lockedCount += 1;
                if (lockedCount === letters.length) {
                    setDecrypting(false);
                    setRevealed(true);
                }
                return;
            }

            const scrambleSpeed = 60 + Math.random() * 50; // 60-110ms
            const interval = setInterval(() => {
                setChars((prev) => {
                    const next = [...prev];
                    next[i] = randomChar();
                    return next;
                });
            }, scrambleSpeed);
            charIntervalsRef.current.push(interval);

            const lockDelay = Math.random() * DECRYPT_DURATION_MS;
            const timeout = setTimeout(() => {
                clearInterval(interval);
                setChars((prev) => {
                    const next = [...prev];
                    next[i] = ch;
                    return next;
                });
                lockedCount += 1;
                if (lockedCount === letters.length) {
                    setDecrypting(false);
                    setRevealed(true);
                }
            }, lockDelay);
            charTimeoutsRef.current.push(timeout);
        });
    };

    // startDecrypt is a plain function recreated every render, so it can't be
    // safely added to the deps array below (the effect would then fire on every
    // render instead of only when decryptAllSignal actually changes). Keep a ref
    // pointing at the latest version, updated every render, and call through
    // the ref — this satisfies exhaustive-deps without ever invoking a stale
    // closure.
    const startDecryptRef = useRef(startDecrypt);
    useLayoutEffect(() => {
        startDecryptRef.current = startDecrypt;
    });

    useEffect(() => {
        if (decryptAllSignal !== prevSignalRef.current) {
            prevSignalRef.current = decryptAllSignal;
            startDecryptRef.current(); // <-- was `startDecrypt()`
        }
    }, [decryptAllSignal]);

    useEffect(() => {
        return () => {
            clearIdleTimers();
            clearDecryptTimers();
        };
    }, []);

    const style: React.CSSProperties = {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: revealed ? 'inherit' : '#0ff',
        textShadow: revealed ? 'none' : '0 0 8px #0ff, 0 0 2px #0ff',
        backgroundColor: revealed ? 'transparent' : 'rgba(0, 20, 20, 0.6)',
        borderRadius: revealed ? '0' : '3px',
        boxShadow: revealed ? 'none' : '0 0 6px rgba(0,255,255,0.4)',
        userSelect: revealed ? 'auto' : 'none',
        cursor: decrypting ? 'default' : 'url("/cursors/pointer.svg") 2 0, pointer',
        transition: 'color 0.2s, background-color 0.2s, box-shadow 0.2s, border-radius 0.2s',
        textDecoration: 'none',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        // reset browser button chrome so it still reads as inline text, not a widget
        border: 'none',
        margin: 0,
        padding: 0,
        display: 'inline',
        font: 'inherit',
    };

    return (
        <button
            type="button"
            aria-label={revealed ? undefined : "Spoiler, click or press Enter to reveal"}
            onClick={startDecrypt}
            disabled={revealed}
            style={style}
        >
            {chars.length ? chars.join("") : originalText}
        </button>
    );
}

// Escapes regex special characters so the raw search query can be dropped
// safely into a RegExp (otherwise typing e.g. "3.24" or "(beta)" would
// throw or match unintended patterns)
function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Splits text around every match of `query` and wraps matches in <mark>.
// Returns the original string untouched when the query is empty, so the
// common no-search-yet case skips the split work.
function highlightMatches(text: string, query: string): React.ReactNode {
    const trimmed = query.trim()
    if (!trimmed) return text

    const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, 'gi'))
    if (parts.length === 1) return text

    return parts.map((part, i) => {
        if (part.toLowerCase() !== trimmed.toLowerCase()) return part

        // parts is rebuilt fresh from text.split() every call (not a persisted/
        // reorderable list), and <mark>/text nodes carry no component state,
        // so there's nothing an index key could cause to go stale.
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key
        return <mark key={i} className="item-search-highlight">{part}</mark>
    })
}

function ItemsTab() {
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<item | null>(null);
    const [atTop, setAtTop] = useState(true);
    const [atBottom, setAtBottom] = useState(false);
    const [decryptAllSignal, setDecryptAllSignal] = useState(0);
    const gridScrollRef = useRef<HTMLDivElement>(null);

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Check if spoilers exist
    const hasSpoilers = useMemo(() => {
        if (!selectedItem?.sources) return false;
        return /~~.+?~~/s.test(selectedItem.sources);
    }, [selectedItem]);

    // Sorting function
    const filteredItems = useMemo(() => {
        const query = search.toLowerCase(); // computed once per change, not per item

        return sortedItems.filter((it) => {
            const matchesCategory = filters.category === "All" || it.category === filters.category;
            const matchesRarity = filters.rarity === "All" || it.rarity === filters.rarity;
            const matchesSearch = it.name.toLowerCase().includes(query);
            return matchesCategory && matchesRarity && matchesSearch;
        });
    }, [filters, search]);

    // Handle fade effects
    const handleGridScroll = useCallback(() => {
        const el = gridScrollRef.current;
        if (!el) return;
        setAtTop(el.scrollTop < 4);
        setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 4);
    }, []); // only touches a ref + stable setters — no reactive values to depend on

    // react-doctor-disable-next-line react-doctor/no-chain-state-updates, react-doctor/exhaustive-deps -- not a
    // pure state->state chain; atTop/atBottom require scrollTop/scrollHeight/
    // clientHeight, which only exist after the filtered list is committed to
    // the DOM. handleGridScroll is a stable useCallback (empty deps, ref-only)
    // so filteredItems is the only real trigger. useLayoutEffect (not useEffect)
    // avoids the one-frame flicker of a stale fade indicator.
    useLayoutEffect(() => {
        handleGridScroll();
    }, [filteredItems, handleGridScroll]);

    useEffect(() => {
        if (!selectedItem) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedItem(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selectedItem]);

    return (
        <div className="tab-content-inner">
            <h2>Items</h2>
            <p>DEV: Holding off on items manually, would probably be better to wait for API</p><br></br> 
            <div className="items-controls">
                <input
                    type="text"
                    className="items-search"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Dropdown
                    value={filters.category}
                    options={categories}
                    allLabel="All Categories"
                    onChange={(v) => updateFilter("category", v)}
                />
                <Dropdown
                    value={filters.rarity}
                    options={rarities}
                    allLabel="All Rarities"
                    onChange={(v) => updateFilter("rarity", v)}
                />
            </div>
            <div
                className={`category-grid-viewport${atTop ? "" : " show-top-fade"}${atBottom ? "" : " show-bottom-fade"}`}
            >
                <div className="category-grid" ref={gridScrollRef} onScroll={handleGridScroll}>
                    {filteredItems.length === 0 && (
                        <p className="no-items">No items found.</p>
                    )}
                    {filteredItems.map((it) => (
                        <button
                            key={it.id}
                            type="button"
                            className={`item-card rarity-${it.rarity.toLowerCase()}`}
                            onClick={() => setSelectedItem(it)}
                        >
                            <div className="item-image">
                                {it.image ? (
                                    <img src={it.image} alt={it.name} />
                                ) : (
                                    <div className="item-image-placeholder">?</div>
                                )}
                            </div>
                            <div className="item-info">
                                <span className="item-name">{highlightMatches(it.name, search)}</span>
                                <span className={`item-rarity rarity-tag-${it.rarity.toLowerCase()}`}>
                                    {it.rarity}
                                </span>
                            </div>
                            <span className="item-price">
                                <CreditIcon className="credit-icon" />
                                {it.sellPrice}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {selectedItem && (
                // background click-away convenience, not a standalone widget; an explicit keyboard-accessible
                // close button already exists (item-modal-close). A role/key-handler here would
                // announce the entire modal as one giant interactive element and pollute the tab order.
                // react-doctor-disable-next-line react-doctor/no-static-element-interactions, react-doctor/click-events-have-key-events
                <div className="item-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="item-modal" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="item-modal-close" onClick={() => setSelectedItem(null)}>
                            ×
                        </button>

                        <div className="item-modal-header">
                            <div className="item-modal-image">
                                {selectedItem.image ? (
                                    <img src={selectedItem.image} alt={selectedItem.name} />
                                ) : (
                                    <div className="item-image-placeholder large">?</div>
                                )}
                            </div>
                            <h3>{selectedItem.name}</h3>
                            <div className="item-modal-tags">
                                <span className="item-modal-category">{selectedItem.category}</span>
                                <span className={`item-rarity rarity-tag-${selectedItem.rarity.toLowerCase()}`}>
                                    {selectedItem.rarity}
                                </span>
                            </div>
                        </div>

                        <div className="item-modal-divider" />

                        <div className="item-modal-body">
                            <p className="item-modal-description">{selectedItem.description}</p>
                            {selectedItem.sources && (
                                <div className="item-modal-sources">
                                    <div className="item-modal-sources-header">
                                        <span className="item-modal-sources-label">Sources</span>
                                        {hasSpoilers && (
                                            <button
                                                type="button"
                                                className="decrypt-all-btn"
                                                onClick={() => setDecryptAllSignal((s) => s + 1)}
                                            >
                                                Decrypt All
                                            </button>
                                        )}
                                    </div>
                                    <DecryptAllContext.Provider value={decryptAllSignal}>
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{ del: Spoiler }}
                                        >{selectedItem.sources}</ReactMarkdown>
                                    </DecryptAllContext.Provider>
                                </div>
                            )}
                        </div>

                        <div className="item-modal-footer">
                            <span className="item-modal-footer-label">Sell Price</span>
                            <span className="item-modal-price">
                                <CreditIcon className="credit-icon" />
                                {selectedItem.sellPrice}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemsTab;