import React from "react";
import type { Marker, GameMap } from "../Data/MapsData.ts";

interface Props {
    map: GameMap;
}

export const MapCanvas: React.FC<Props> = ({ map }) => {
    return (
        <div style={{ position: "relative", width: "100%" }}>

            {/* Map image */}
            <img
                src={map.image}
                alt={map.name}
                draggable={false}
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block"
                }}
            />

            {/* Markers (normalized positioning) */}
            {map.markers.map((marker: Marker) => (
                <div
                    key={marker.id}
                    title={marker.label}
                    style={{
                        position: "absolute",
                        left: `${marker.x * 100}%`,
                        top: `${marker.y * 100}%`,
                        transform: "translate(-50%, -100%)",
                        cursor: "pointer"
                    }}
                >
                    <img
                        src={marker.icon}
                        width={36}
                        height={36}
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