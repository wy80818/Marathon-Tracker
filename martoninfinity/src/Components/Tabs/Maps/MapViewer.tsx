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

    const containerRef = useRef<HTMLDivElement>(null);
    const currentMap = maps.find(m => m.id === selectedMapId)!;

    const markerTypes = [...new Set(currentMap.markers.map(m => m.type))];

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

        // clear currently selected marker
        setSelectedMarker(null);
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
                        <div className="marker-controls">
                            <button onClick={showAllMarkers}>
                                Show All
                            </button>

                            <button onClick={hideAllMarkers}>
                                Hide All
                            </button>
                        </div>

                        <div className="marker-list">
                            {markerTypes.map(type => {
                                const exampleMarker = currentMap.markers.find(
                                    marker => marker.type === type
                                );

                                if (!exampleMarker) return null;

                                return (
                                    <div
                                        key={type}
                                        className={`marker-toggle ${visibleMarkers[type] ?? true ? "active" : ""}`}
                                        onClick={() =>
                                            setVisibleMarkers(prev => ({
                                                ...prev,
                                                [type]: !(prev[type] ?? true)
                                            }))
                                        }
                                    >
                                        <img
                                            src={exampleMarker.icon}
                                            alt={exampleMarker.label}
                                            width={24}
                                            height={24}
                                        />

                                        <span>{exampleMarker.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div ref={containerRef} className="map-container">
                    <TransformWrapper
                        initialScale={.85}
                        centerOnInit
                        limitToBounds
                        minScale={.85}
                        maxScale={4}
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
                                        <div
                                            className="marker-overlay"
                                            style={{
                                                position: "absolute",
                                                left: pos.left,
                                                top: pos.top,
                                                transform: isRightSide
                                                    ? "translate(calc(-100% - 20px), -50%)"
                                                    : "translate(20px, -50%)",
                                                zIndex: 9999
                                            }}
                                        >
                                            <div className="marker-overlay-card">
                                                <div className="marker-overlay-header">
                                                    <img src={selectedMarker.icon} width={28} height={28} />
                                                    <h4>{selectedMarker.label}</h4>
                                                </div>

                                                <p>{selectedMarker.description}</p>

                                                <button
                                                    onClick={() => setSelectedMarker(null)}
                                                    className="marker-overlay-close"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
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