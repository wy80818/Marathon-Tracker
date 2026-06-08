import { useRef, useState } from "react";
import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import "./MapViewer.css"

import MapCanvas from "./MapCanvas";
import { maps } from "../Data/MapsData";

const MapViewer = () => {
    const [selectedMapId, setSelectedMapId] = useState(maps[0].id);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentMap = maps.find(m => m.id === selectedMapId)!;

    const [initialTransform, setInitialTransform] = useState({
        scale: 1,
        x: 0,
        y: 0
    });

    return (
        <div className="map-window">
            <div className="map-toolbar">
                <h3>{currentMap.name}</h3>

                <select
                    value={selectedMapId}
                    onChange={(e) => setSelectedMapId(e.target.value)}
                >
                    {maps.map(map => (
                        <option key={map.id} value={map.id}>
                            {map.name}
                        </option>
                    ))}
                </select>
            </div>

            <div ref={containerRef} className="map-container">

                <TransformWrapper
                    initialScale={initialTransform.scale}
                    initialPositionX={initialTransform.x}
                    initialPositionY={initialTransform.y}
                    minScale={0.5}
                    maxScale={6}
                    limitToBounds
                    wheel={{ step: 0.001 }}
                    doubleClick={{ step: 1.5 }}
                    velocityAnimation={{ animationTime: 350 }}
                >
                    {({ resetTransform }) => (
                        <>
                            <div className="zoom-buttons">
                                <button onClick={() => resetTransform()}>Reset</button>
                            </div>

                            <TransformComponent>
                                <MapCanvas map={currentMap} />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>

            </div>
        </div>
    );
};

export default MapViewer;