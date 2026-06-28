import { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

import "./MapViewer.css";

import type { Marker } from "../../../Data/MapsData";
import { maps } from "../../../Data/MapsData";
import MapCanvas from "./MapCanvas";

const MapViewer = () => {
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [displayedMapId, setDisplayedMapId] = useState(maps[0].id);
    const [selectedMapId, setSelectedMapId] = useState(maps[0].id);
    const [scale, setScale] = useState(0.85);
    const [isHoveringMap, setIsHoveringMap] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [visibleMarkers, setVisibleMarkers] = useState<Record<string, boolean>>({});
    const [imageReady, setImageReady] = useState(true);
    const [isHoveringOverlay, setIsHoveringOverlay] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const mapCanvasRef = useRef<HTMLDivElement>(null);
    const transformRef = useRef<ReactZoomPanPinchRef>(null);

    const currentMap = maps.find(m => m.id === displayedMapId)!;
    const markerTypes = [...new Set(currentMap.markers.map(m => m.type))];

    const groupedMarkers = currentMap.markerGroups.reduce(
        (acc, group) => {
            if (!acc[group.category]) acc[group.category] = [];
            acc[group.category].push(group);
            return acc;
        },
        {} as Record<string, typeof currentMap.markerGroups>
    );

    const getPopupPosition = (marker: Marker) => {
        const canvas = mapCanvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return { left: 0, top: 0 };
        const canvasRect = canvas.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        return {
            left: canvasRect.left - containerRect.left + marker.x * canvasRect.width,
            top: canvasRect.top - containerRect.top + marker.y * canvasRect.height,
        };
    };

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

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const stop = (e: WheelEvent) => e.preventDefault();
        el.addEventListener("wheel", stop, { passive: false });
        return () => el.removeEventListener("wheel", stop);
    }, []);

    useEffect(() => {
        const defaults: Record<string, boolean> = {};
        currentMap.markers.forEach(marker => {
            defaults[marker.type] = true;
        });

        setVisibleMarkers(defaults);
        setSelectedMarker(null);
    }, [displayedMapId]);

    useEffect(() => {
        const initial: Record<string, boolean> = {};

        Object.keys(groupedMarkers).forEach(category => {
            initial[category] = true;
        });

        setOpenCategories(initial);
    }, [displayedMapId]);

    useEffect(() => {
        if (selectedMapId === displayedMapId) return;

        setImageReady(false);

        const FADE_DURATION = 100;

        const timer = setTimeout(() => {
            setDisplayedMapId(selectedMapId);
        }, FADE_DURATION);

        return () => clearTimeout(timer);
    }, [selectedMapId, displayedMapId]);

    useEffect(() => {
        const img = new Image();
        img.src = currentMap.image;

        img.onload = () => {
            requestAnimationFrame(() => {
                transformRef.current?.resetTransform(0);
                setImageReady(true);
            });
        };
    }, [currentMap.image]);

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
                            {Object.entries(groupedMarkers).map(([category, groups]) => {
                                const total = groups.length;
                                const shown = groups.filter(g => visibleMarkers[g.type]).length;
                                return (
                                    <div className="marker-category" key={category}>
                                        <div className="marker-category-header">
                                            <div
                                                className={`marker-category-title ${openCategories[category] ? "open" : "closed"}`}
                                                onClick={() =>
                                                    setOpenCategories(prev => ({
                                                        ...prev,
                                                        [category]: !prev[category]
                                                    }))
                                                }
                                            >
                                                <span>{openCategories[category] ? "ls /" : "/"}{category}</span>
                                                <span className="marker-category-count">{shown}/{total}</span>
                                            </div>
                                            <div className="category-controls">
                                                <button onClick={() => setVisibleMarkers(prev => {
                                                    const u = { ...prev };
                                                    groups.forEach(g => (u[g.type] = true));
                                                    return u;
                                                })}>Show All</button>
                                                <button onClick={() => setVisibleMarkers(prev => {
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
                                                        className={`marker-toggle ${visibleMarkers[group.type] ? "active" : ""}`}
                                                        onClick={() =>
                                                            setVisibleMarkers(prev => ({
                                                                ...prev,
                                                                [group.type]: !(prev[group.type] ?? true)
                                                            }))
                                                        }
                                                    >
                                                        <img src={group.icon} width={24} height={24} />
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

                <div ref={containerRef} className="map-container">
                    <div style={{
                        width: "100%",
                        height: "100%",
                        opacity: imageReady ? 1 : 0,
                        transition: "opacity .1s ease",
                    }}>
                        <TransformWrapper
                            ref={transformRef}
                            initialScale={0.85}
                            centerOnInit
                            limitToBounds
                            centerZoomedOut
                            minScale={0.85}
                            maxScale={8}
                            wheel={{ step: 0.005 }}
                            doubleClick={{ step: 1.5 }}
                            velocityAnimation={{ animationTime: 400 }}
                            onTransform={({ state }) => setScale(state.scale)}
                        >
                            {
                                <div
                                    style={{ position: "relative", width: "100%", height: "100%" }}
                                    onMouseEnter={() => setIsHoveringMap(true)}
                                    onMouseLeave={() => setIsHoveringMap(false)}
                                >
                                    <TransformComponent
                                        wrapperStyle={{ width: "100%", height: "100%" }}
                                        contentStyle={{ pointerEvents: "auto" }}
                                    >
                                        <MapCanvas
                                            ref={mapCanvasRef}
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
                                        const isRightSide = container
                                            ? (pos.left / container.getBoundingClientRect().width) > 0.5
                                            : false;
                                        return (
                                            <div
                                                className="marker-overlay"
                                                style={{
                                                    left: pos.left,
                                                    top: pos.top,
                                                    transform: isRightSide
                                                        ? "translate(calc(-100% - 20px), -50%)"
                                                        : "translate(20px, -50%)"
                                                }}
                                                onMouseEnter={() => setIsHoveringOverlay(true)}
                                                onMouseLeave={() => setIsHoveringOverlay(false)}
                                            >
                                                <div className="marker-overlay-card" onClick={e => e.stopPropagation()}>
                                                    <div className="marker-overlay-header">
                                                        <img src={selectedMarker.icon} width={28} height={28} />
                                                        <h4>{selectedMarker.label}</h4>
                                                    </div>
                                                    <p>{selectedMarker.description}</p>
                                                    <button
                                                        className="marker-overlay-close"
                                                        onClick={() => setSelectedMarker(null)}
                                                    >×</button>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="zoom-buttons">
                                        <button
                                            onClick={() => {
                                                transformRef.current?.centerView(0.85, 300);
                                            }}
                                        >
                                            Reset
                                        </button>
                                    </div>

                                    {isHoveringMap && (
                                        <div style={{
                                            position: "absolute", top: "10px", left: "10px", zIndex: 10,
                                            background: "rgba(0,0,0,0.7)", color: "white",
                                            padding: "6px 10px", borderRadius: "6px", fontFamily: "monospace"
                                        }}>
                                            x: {cursorPos.x}<br />y: {cursorPos.y}
                                        </div>
                                    )}
                                </div>
                            }
                        </TransformWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapViewer;