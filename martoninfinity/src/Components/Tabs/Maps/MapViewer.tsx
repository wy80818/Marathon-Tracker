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
                        initialScale={1}
                        centerOnInit
                        limitToBounds
                        minScale={1}
                        maxScale={3}
                        wheel={{ step: 0.001 }}
                        doubleClick={{ step: 1.5 }}
                        velocityAnimation={{ animationTime: 400 }}
                    >
                        {({ resetTransform }) => (
                            <>
                                <div className="zoom-buttons">
                                    <button onClick={() => resetTransform()}>
                                        Reset
                                    </button>
                                </div>

                                <TransformComponent>
                                    <MapCanvas map={currentMap} />
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>

                </div>

            </div>
        </div>
    );
};

export default MapViewer;