import { forwardRef } from "react";
import type { Marker, GameMap } from "../../../Data/MapsData.ts";

interface Props {
    map: GameMap;
    scale: number;
    onMouseMove: (pos: { x: number; y: number }) => void;
    visibleMarkers: Record<string, boolean>;
    selectedMarker: Marker | null;
    onMarkerClick: (marker: Marker | null) => void;
}

export const MapCanvas = forwardRef<HTMLDivElement, Props>(({
    map, scale, onMouseMove, visibleMarkers, selectedMarker, onMarkerClick
}, ref) => {
    return (
        <div
            ref={ref}          // ← attach here
            style={{ position: "relative", display: "inline-block" }}
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
                    width: "100%",
                    height: "auto"
                }}
            />

            {map.markers
                .filter(marker => visibleMarkers[marker.type])
                .map(marker => (
                    <div
                        key={marker.id}
                        onClick={() => {
                            onMarkerClick(
                                selectedMarker?.id === marker.id ? null : marker
                            );
                        }}
                        style={{
                            position: "absolute",
                            left: `${marker.x * 100}%`,
                            top: `${marker.y * 100}%`,
                            transform: `translate(-50%, -50%) scale(${1 / scale})`,
                            transformOrigin: "center",
                            cursor: 'url("/cursors/pointer.svg") 2 0, pointer'
                        }}
                    >
                        <img
                            src={marker.icon}
                            alt={marker.label}
                            width={30}
                            height={30}
                            style={{
                                display: "block",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
                            }}
                        />
                    </div>
                ))}
        </div>
    );
});

export default MapCanvas;