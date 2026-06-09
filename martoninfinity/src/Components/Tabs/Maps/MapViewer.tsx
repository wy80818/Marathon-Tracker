import { useRef, useState } from "react";
import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import "./MapViewer.css"

import MapCanvas from "./MapCanvas";
import { maps } from "../../../Data/MapsData";

const MapViewer = () => {
    const [selectedMapId, setSelectedMapId] = useState(maps[0].id);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHoveringMap, setIsHoveringMap] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentMap = maps.find(m => m.id === selectedMapId)!;

    return (
        <div className="map-window">
            <div className="map-layout">

                <div className="map-sidebar">
                    <h2>Maps</h2>
                    {maps.map(map => (
                        <button
                            key={map.id}
                            className={`map-button ${selectedMapId === map.id ? "active" : ""
                                }`}
                            onClick={() => setSelectedMapId(map.id)}
                        >
                            {map.name}
                        </button>
                    ))}
                </div>

                <div ref={containerRef} className="map-container">
                    <TransformWrapper
                        initialScale={.85}
                        centerOnInit
                        limitToBounds
                        minScale={.85}
                        maxScale={4}
                        wheel={{
                            step: 0.001,
                            activationKeys: ["Shift"]

                        }}
                        doubleClick={{ step: 1.5 }}
                        velocityAnimation={{ animationTime: 400 }}
                    >
                        {({ resetTransform }) => (
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "700px"
                                }}
                            >
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
                                            alignItems: "center"
                                        }}
                                    >
                                        <MapCanvas
                                            map={currentMap}
                                            onMouseMove={setCursorPos}
                                        />
                                    </TransformComponent>
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
                            </div>
                        )}
                    </TransformWrapper>
                </div>
                Shift + Scroll over map to Zoom In/Out.
            </div>
        </div>
    );
};

export default MapViewer;