import { useState, useMemo, memo } from "react";
import { maps, type GameMap } from "../../../Data/MapsData";
import EyeIcon from "../../../assets/Miscellaneous/Eye.svg?react";
import EyeOffIcon from "../../../assets/Miscellaneous/EyeOff.svg?react";

interface Props {
    currentMap: GameMap;
    selectedMapId: string;
    onSelectMap: (id: string) => void;
    visibleMarkers: Record<string, boolean>;
    setVisibleMarkers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    isCollapsed: boolean;
}

function MapSidebar({
    currentMap, selectedMapId, onSelectMap, visibleMarkers, setVisibleMarkers, isCollapsed
}: Props) {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [prevMapId, setPrevMapId] = useState(currentMap.id);

    const markerTypes = useMemo(
        () => [...new Set(currentMap.markers.map(m => m.type))],
        [currentMap]
    );

    const groupedMarkers = useMemo(
        () => currentMap.markerGroups.reduce(
            (acc, group) => {
                (acc[group.category] ??= []).push(group);
                return acc;
            },
            {} as Record<string, typeof currentMap.markerGroups>
        ),
        [currentMap]
    );

    // Adjust state during render instead of in an effect: when the displayed
    // map changes, reopen every category immediately, in the same commit,
    // rather than flashing the previous map's open/closed state for a frame.
    if (currentMap.id !== prevMapId) {
        setPrevMapId(currentMap.id);
        const initial: Record<string, boolean> = {};
        Object.keys(groupedMarkers).forEach(category => {
            initial[category] = true;
        });
        setOpenCategories(initial);
    }

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
        <div className={`map-side-column ${isCollapsed ? "collapsed" : ""}`}>
            <div className="map-sidebar-inner">
                {/* Full content — always mounted, cross-fades out on collapse
                    instead of unmounting, so the animation has something to run. */}
                <div className="map-sidebar-full">
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
                                <button type="button" onClick={showAllMarkers} aria-label="Show all markers" title="Show all">
                                    <EyeIcon />
                                </button>
                                <button type="button" onClick={hideAllMarkers} aria-label="Hide all markers" title="Hide all">
                                    <EyeOffIcon />
                                </button>
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
                                                <button
                                                    type="button"
                                                    aria-label={`Show all ${category}`}
                                                    title="Show all"
                                                    onClick={() => setVisibleMarkers(prev => {
                                                        const u = { ...prev };
                                                        groups.forEach(g => (u[g.type] = true));
                                                        return u;
                                                    })}
                                                >
                                                    <EyeIcon />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label={`Hide all ${category}`}
                                                    title="Hide all"
                                                    onClick={() => setVisibleMarkers(prev => {
                                                        const u = { ...prev };
                                                        groups.forEach(g => (u[g.type] = false));
                                                        return u;
                                                    })}
                                                >
                                                    <EyeOffIcon />
                                                </button>
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
            </div>
        </div>
    );
}

export default memo(MapSidebar);