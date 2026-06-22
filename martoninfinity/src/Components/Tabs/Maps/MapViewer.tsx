import { useEffect, useRef, useState } from "react";
import {
    TransformComponent,
    TransformWrapper
} from "react-zoom-pan-pinch";

import "./MapViewer.css";

import type { Marker } from "../../../Data/MapsData";
import { maps } from "../../../Data/MapsData";
import MapCanvas from "./MapCanvas";

const MapViewer = () => {
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [selectedMapId, setSelectedMapId] = useState(maps[0].id);
    const [scale, setScale] = useState(0.85);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHoveringMap, setIsHoveringMap] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const containerRef = useRef<HTMLDivElement>(null);
    const currentMap = maps.find(m => m.id === selectedMapId)!;

    const markerTypes = [...new Set(currentMap.markers.map(m => m.type))];

    const groupedMarkers = currentMap.markerGroups.reduce(
        (acc, group) => {
            if (!acc[group.category]) {
                acc[group.category] = [];
            }

            acc[group.category].push(group);

            return acc;
        },
        {} as Record<string, typeof currentMap.markerGroups>
    );

    const getPopupPosition = (marker: Marker) => {
        const container = containerRef.current;
        if (!container) return { left: 0, top: 0 };

        const rect = container.getBoundingClientRect();

        const worldX = rect.width * marker.x;
        const worldY = rect.height * marker.y;

        return {
            left: worldX * scale + position.x,
            top: worldY * scale + position.y
        };
    };

    const showAllMarkers = () => {
        const allVisible: Record<string, boolean> = {};

        markerTypes.forEach(type => {
            allVisible[type] = true;
        });

        setVisibleMarkers(allVisible);
    };

    const hideAllMarkers = () => {
        const allHidden: Record<string, boolean> = {};

        markerTypes.forEach(type => {
            allHidden[type] = false;
        });

        setVisibleMarkers(allHidden);
    };

    const [visibleMarkers, setVisibleMarkers] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const defaults: Record<string, boolean> = {};

        currentMap.markers.forEach(marker => {
            defaults[marker.type] = true;
        });

        setVisibleMarkers(defaults);

        setSelectedMarker(null);
    }, [selectedMapId]);

    useEffect(() => {
        const initial: Record<string, boolean> = {};

        Object.keys(groupedMarkers).forEach(category => {
            initial[category] = true;
        });

        setOpenCategories(initial);
    }, [selectedMapId]);

    return (
        <div className="map-window">
            <div className="map-layout">
                <div className="map-side-column">
                    <div className="map-sidebar">
                        <h2>Maps</h2>

                        <div className="map-list">
                            {maps.map(map => (
                                <button
                                    key={map.id}
                                    className={`map-button ${selectedMapId === map.id ? "active" : ""}`}
                                    onClick={() => setSelectedMapId(map.id)}
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
                                <button onClick={showAllMarkers}>Show All</button>
                                <button onClick={hideAllMarkers}>Hide All</button>
                            </div>
                        </div>
                        <div className="map-key-content">
                            <div className="map-key-content">
                                {Object.entries(groupedMarkers).map(([category, groups]) => (
                                    <div className="marker-category">
                                        <div className="marker-category-header">
                                            <div
                                                className="marker-category-title"
                                                onClick={() =>
                                                    setOpenCategories(prev => ({
                                                        ...prev,
                                                        [category]: !prev[category]
                                                    }))
                                                }
                                            >
                                                {openCategories[category] ? "▼" : "▶"} {category}
                                            </div>

                                            <div className="category-controls">
                                                <button
                                                    onClick={() => {
                                                        setVisibleMarkers(prev => {
                                                            const updated = { ...prev };

                                                            groups.forEach(group => {
                                                                updated[group.type] = true;
                                                            });

                                                            return updated;
                                                        });
                                                    }}
                                                >
                                                    Show All
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setVisibleMarkers(prev => {
                                                            const updated = { ...prev };

                                                            groups.forEach(group => {
                                                                updated[group.type] = false;
                                                            });

                                                            return updated;
                                                        });
                                                    }}
                                                >
                                                    Hide All
                                                </button>
                                            </div>
                                        </div>

                                        {openCategories[category] && (
                                            <div className="marker-list">
                                                {groups.map(group => {
                                                    const type = group.type;

                                                    return (
                                                        <div
                                                            key={type}
                                                            className={`marker-toggle ${visibleMarkers[type] ?? true ? "active" : ""
                                                                }`}
                                                            onClick={() =>
                                                                setVisibleMarkers(prev => ({
                                                                    ...prev,
                                                                    [type]: !(prev[type] ?? true)
                                                                }))
                                                            }
                                                        >
                                                            <img
                                                                src={group.icon}
                                                                alt={group.defaultLabel}
                                                                width={24}
                                                                height={24}
                                                            />

                                                            <span>{group.defaultLabel}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={containerRef} className="map-container">
                    <TransformWrapper
                        initialScale={.85}
                        centerOnInit
                        limitToBounds
                        minScale={.85}
                        maxScale={8}
                        wheel={{
                            step: 0.005

                        }}
                        doubleClick={{ step: 1.5 }}
                        velocityAnimation={{ animationTime: 400 }}
                        onTransform={({ state }) => {
                            setScale(state.scale);
                            setPosition({
                                x: state.positionX,
                                y: state.positionY
                            });
                        }}
                    >
                        {({ resetTransform }) => (
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "700px"
                                }}
                                onMouseEnter={() => setIsHoveringMap(true)}
                                onMouseLeave={() => setIsHoveringMap(false)}
                            >
                                <TransformComponent
                                    wrapperStyle={{
                                        width: "100%",
                                        height: "100%"
                                    }}
                                    contentStyle={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        pointerEvents: "auto"
                                    }}
                                >
                                    <MapCanvas
                                        map={currentMap}
                                        scale={scale}
                                        onMouseMove={setCursorPos}
                                        visibleMarkers={visibleMarkers}
                                        selectedMarker={selectedMarker}
                                        onMarkerClick={setSelectedMarker}
                                    />
                                </TransformComponent>
                                {selectedMarker && (() => {
                                    const pos = getPopupPosition(selectedMarker);
                                    const container = containerRef.current;

                                    const isRightSide =
                                        container
                                            ? (pos.left / container.getBoundingClientRect().width) > 0.5
                                            : false;

                                    return (
                                        <>
                                            <div
                                                className="marker-overlay"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    left: pos.left,
                                                    top: pos.top,
                                                    transform: isRightSide
                                                        ? "translate(calc(-100% - 20px), -50%)"
                                                        : "translate(20px, -50%)"
                                                }}
                                            >
                                                <div
                                                    className="marker-overlay-card"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <div className="marker-overlay-header">
                                                        <img src={selectedMarker.icon} width={28} height={28} />
                                                        <h4>{selectedMarker.label}</h4>
                                                    </div>

                                                    <p>{selectedMarker.description}</p>

                                                    <button
                                                        className="marker-overlay-close"
                                                        onClick={() => setSelectedMarker(null)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                                {isHoveringMap && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            left: "10px",
                                            zIndex: 10,
                                            background: "rgba(0, 0, 0, 0.7)",
                                            color: "white",
                                            padding: "6px 10px",
                                            borderRadius: "6px",
                                            fontFamily: "monospace"
                                        }}
                                    >
                                        x: {cursorPos.x}<br />
                                        y: {cursorPos.y}
                                    </div>
                                )}
                                <div
                                    className="zoom-buttons"
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        zIndex: 10
                                    }}
                                >
                                    <button onClick={() => resetTransform()}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </TransformWrapper>
                </div>

            </div>
        </div>
    );
};

export default MapViewer;