import { useEffect, useMemo, useRef, useState } from "react";
import { items, type categoryType, type rarityType } from "../../../Data/ItemsData";
import type { item } from "../../../Data/ItemsData";

import "./ItemsTab.css";

const categories: categoryType[] = ["Consumable", "Salvage", "Equipment"];
const rarities: rarityType[] = ["Standard", "Enhanced", "Deluxe", "Superior", "Prestige"];

interface Filters {
    category: categoryType | "All";
    rarity: rarityType | "All";
}

const defaultFilters: Filters = {
    category: "All",
    rarity: "All",
};

const filterLabels: Record<keyof Filters, string> = {
    category: "Category",
    rarity: "Rarity",
};

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

    const clearFilter = (key: keyof Filters) => {
        setFilters((prev) => ({ ...prev, [key]: "All" }));
    };

    const clearAllFilters = () => setFilters(defaultFilters);

    const activeFilterEntries = (Object.keys(filters) as (keyof Filters)[]).filter(
        (key) => filters[key] !== "All"
    );

    const filteredItems = useMemo(() => {
        return items.filter((it) => {
            const matchesCategory = filters.category === "All" || it.category === filters.category;
            const matchesRarity = filters.rarity === "All" || it.rarity === filters.rarity;
            const matchesSearch = it.name.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesRarity && matchesSearch;
        });
    }, [filters, search]);

    const handleGridScroll = () => {
        const el = gridScrollRef.current;
        if (!el) return;
        setAtTop(el.scrollTop < 4);
        setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 4);
    };

    // Re-evaluate fade state whenever the visible item set changes
    // (e.g. filtering down to a short list should hide both fades).
    useEffect(() => {
        handleGridScroll();
    }, [filteredItems]);

    return (
        <div className="tab-content-inner">
            <h2>Items</h2>

            <div className="items-controls">
                <div className="filter-group">
                    <select
                        className="filter-dropdown"
                        value={filters.category}
                        onChange={(e) => updateFilter("category", e.target.value as Filters["category"])}
                    >
                        <option value="All">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        className="filter-dropdown"
                        value={filters.rarity}
                        onChange={(e) => updateFilter("rarity", e.target.value as Filters["rarity"])}
                    >
                        <option value="All">All Rarities</option>
                        {rarities.map((rar) => (
                            <option key={rar} value={rar}>
                                {rar}
                            </option>
                        ))}
                    </select>

                    {/* Future filters can be added here as additional <select> elements */}
                </div>

                <input
                    type="text"
                    className="items-search"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {activeFilterEntries.length > 0 && (
                <div className="active-filters-row">
                    {activeFilterEntries.map((key) => (
                        <span key={key} className="filter-bubble">
                            <span className="filter-bubble-label">{filterLabels[key]}:</span>
                            <span className="filter-bubble-value">{filters[key]}</span>
                            <button
                                className="filter-bubble-remove"
                                onClick={() => clearFilter(key)}
                                aria-label={`Remove ${filterLabels[key]} filter`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    {activeFilterEntries.length > 1 && (
                        <button className="filter-clear-all" onClick={clearAllFilters}>
                            Clear all
                        </button>
                    )}
                </div>
            )}

            <div
                className={`category-grid-viewport${atTop ? "" : " show-top-fade"}${atBottom ? "" : " show-bottom-fade"
                    }`}
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
                            <span className="item-price">{it.sellPrice}</span>
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
                                    <p>{selectedItem.sources}</p>
                                </div>
                            )}
                        </div>

                        <div className="item-modal-footer">
                            <span className="item-modal-footer-label">Sell Price</span>
                            <span className="item-modal-price">{selectedItem.sellPrice}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemsTab;