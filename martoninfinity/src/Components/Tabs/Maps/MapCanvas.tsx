import React from "react";
import type { Marker, GameMap } from "../../../Data/MapsData.ts";
import { useTransformContext } from "react-zoom-pan-pinch";

interface Props {
    map: GameMap;
    onMouseMove: (pos: { x: number; y: number }) => void;
}

export const MapCanvas: React.FC<Props> = ({ map, onMouseMove }) => {
    const { state } = useTransformContext();
    const scale = state.scale;

    const baseSize = 30;
    const markerSize = baseSize / scale;

    return (
        <div
            style={{
                position: "relative",
                display: "inline-block"
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();

                onMouseMove({
                    x: Number(((e.clientX - rect.left) / rect.width).toFixed(3)),
                    y: Number(((e.clientY - rect.top) / rect.height).toFixed(3))
                });
            }}
        >
            <img
                src={map.image}
                alt={map.name}
                draggable={false}
                style={{
                    display: "block",
                    maxWidth: "100%",
                    height: "auto"
                }}
            />

            {map.markers.map(marker => (
                <div
                    key={marker.id}
                    style={{
                        position: "absolute",
                        left: `${marker.x * 100}%`,
                        top: `${marker.y * 100}%`,
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <img
                        src={marker.icon}
                        alt={marker.label}
                        width={markerSize}
                        height={markerSize}
                        style={{
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default MapCanvas;