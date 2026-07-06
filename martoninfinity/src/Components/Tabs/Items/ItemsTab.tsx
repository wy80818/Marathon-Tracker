import { useEffect, useMemo, useRef, useState } from "react";
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

const SCRAMBLE_CHARS = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?";
const DECRYPT_DURATION_MS = 600;

function Spoiler({ children }: { children?: React.ReactNode }) {
    const [revealed, setRevealed] = useState(false);
    const [decrypting, setDecrypting] = useState(false);
    const [chars, setChars] = useState<string[]>([]);
    const idleIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
    const charIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
    const charTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const originalText = typeof children === "string" ? children : "";

    const randomChar = () =>
        SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

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

            const scrambleSpeed = 60 + Math.random() * 80; // 60-140ms, each char its own rate
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

            const scrambleSpeed = 30 + Math.random() * 50; // 30-80ms
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

    useEffect(() => {
        return () => {
            clearIdleTimers();
            clearDecryptTimers();
        };
    }, []);

    const style: React.CSSProperties = {
        fontFamily: 'inherit',
        color: revealed ? 'inherit' : '#0ff',
        textShadow: revealed ? 'none' : '0 0 8px #0ff, 0 0 2px #0ff',
        backgroundColor: revealed ? 'transparent' : 'rgba(0, 20, 20, 0.6)',
        borderRadius: revealed ? '0' : '3px',
        boxShadow: revealed ? 'none' : '0 0 6px rgba(0,255,255,0.4)',
        userSelect: revealed ? 'auto' : 'none',
        cursor: decrypting ? 'default' : 'url("/cursors/pointer.svg") 2 0, pointer',
        transition: 'color 0.2s, background-color 0.2s, box-shadow 0.2s, border-radius 0.2s',
        textDecoration: 'none',
        whiteSpace: 'pre',
    };

    return (
        <del onClick={startDecrypt} style={style}>
            {chars.length ? chars.join("") : originalText}
        </del>
    );
}

function ItemsTab() {
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<item | null>(null);
    const [atTop, setAtTop] = useState(true);
    const [atBottom, setAtBottom] = useState(false);
    const gridScrollRef = useRef<HTMLDivElement>(null);

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredItems = useMemo(() => {
        return items
            .filter((it) => {
                const matchesCategory = filters.category === "All" || it.category === filters.category;
                const matchesRarity = filters.rarity === "All" || it.rarity === filters.rarity;
                const matchesSearch = it.name.toLowerCase().includes(search.toLowerCase());
                return matchesCategory && matchesRarity && matchesSearch;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [filters, search]);

    const handleGridScroll = () => {
        const el = gridScrollRef.current;
        if (!el) return;
        setAtTop(el.scrollTop < 4);
        setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 4);
    };

    useEffect(() => {
        handleGridScroll();
    }, [filteredItems]);

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
                                <span className="item-name">{it.name}</span>
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
                <div className="item-modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="item-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="item-modal-close" onClick={() => setSelectedItem(null)}>
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
                                    <span className="item-modal-sources-label">Sources</span>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{ del: Spoiler }}
                                    >{selectedItem.sources}</ReactMarkdown>
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