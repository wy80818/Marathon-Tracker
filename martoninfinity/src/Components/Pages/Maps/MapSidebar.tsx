import { useEffect, useState } from "react";
import { maps, type GameMap } from "../../../Data/MapsData";

interface Props {
    currentMap: GameMap;
    selectedMapId: string;
    onSelectMap: (id: string) => void;
    visibleMarkers: Record<string, boolean>;
    setVisibleMarkers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    onBack: () => void;
}

function MapSidebar({
    currentMap, selectedMapId, onSelectMap, visibleMarkers, setVisibleMarkers, onBack
}: Props) {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const markerTypes = [...new Set(currentMap.markers.map(m => m.type))];

    const groupedMarkers = currentMap.markerGroups.reduce(
        (acc, group) => {
            if (!acc[group.category]) acc[group.category] = [];
            acc[group.category].push(group);
            return acc;
        },
        {} as Record<string, typeof currentMap.markerGroups>
    );

    // Sidebar categories — reopen everything whenever the displayed map changes
    useEffect(() => {
        const initial: Record<string, boolean> = {};
        Object.keys(groupedMarkers).forEach(category => {
            initial[category] = true;
        });
        setOpenCategories(initial);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- groupedMarkers
        // is derived purely from currentMap, so currentMap.id alone determines this.
    }, [currentMap.id]);

    const showAllMarkers = () => {
        const all: Record<string, boolean> = {};
        markerTypes.forEach(type => { all[type] = true; });
        setVisibleMarkers(all);
    };

    const hideAllMarkers = () => {
        const all: Record<string, boolean> = {};
        markerTypes.forEach(type => { all[type] = false; });
        setVisibleMarkers(all);
    };

    return (
        <div className="map-side-column">
            <button type="button" className="map-back" onClick={onBack}>
                ← Back to Maps
            </button>
            <div className="map-sidebar">
                <h2>Maps</h2>
                <div className="map-list">
                    {maps.map(map => (
                        <button
                            key={map.id}
                            type="button"
                            className={`map-button ${selectedMapId === map.id ? "active" : ""}`}
                            onClick={() => onSelectMap(map.id)}
                        >
                            <p>{map.name}</p>
                        </button>
                    ))}
                </div>
            </div>
            <div className="map-key">
                <div className="map-key-header">
                    <h2>Markers</h2>
                    <div className="marker-controls">
                        <button type="button" onClick={showAllMarkers}>Show All</button>/
                        <button type="button" onClick={hideAllMarkers}>Hide All</button>
                    </div>
                </div>
                <div className="map-key-content">
                    {Object.entries(groupedMarkers).map(([category, groups]) => {
                        const total = groups.length;
                        const shown = groups.filter(g => visibleMarkers[g.type]).length;
                        return (
                            <div className="marker-category" key={category}>
                                <div className="marker-category-header">
                                    <button
                                        type="button"
                                        className={`marker-category-title ${openCategories[category] ? "open" : "closed"}`}
                                        onClick={() => setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }))}
                                        aria-expanded={openCategories[category]}
                                    >
                                        <span>{openCategories[category] ? "ls /" : "/"}{category}</span>
                                        <span className="marker-category-count">{shown}/{total}</span>
                                    </button>
                                    <div className="category-controls">
                                        <button type="button" onClick={() => setVisibleMarkers(prev => {
                                            const u = { ...prev };
                                            groups.forEach(g => (u[g.type] = true));
                                            return u;
                                        })}>Show All</button>/
                                        <button type="button" onClick={() => setVisibleMarkers(prev => {
                                            const u = { ...prev };
                                            groups.forEach(g => (u[g.type] = false));
                                            return u;
                                        })}>Hide All</button>
                                    </div>
                                </div>
                                {openCategories[category] && (
                                    <div className="marker-list">
                                        {groups.map(group => (
                                            <div
                                                key={group.type}
                                                role="checkbox"
                                                aria-checked={visibleMarkers[group.type] ?? true}
                                                tabIndex={0}
                                                className={`marker-toggle ${visibleMarkers[group.type] ? "active" : ""}`}
                                                onClick={() => setVisibleMarkers(prev => ({ ...prev, [group.type]: !(prev[group.type] ?? true) }))}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        setVisibleMarkers(prev => ({ ...prev, [group.type]: !(prev[group.type] ?? true) }));
                                                    }
                                                }}
                                            >
                                                <img src={group.icon} width={24} height={24} alt="" />
                                                <span>{group.defaultLabel}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MapSidebar;