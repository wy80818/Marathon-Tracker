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

const renderMarkerContent = (marker: Marker, isSelected: boolean) => {
    if (marker.type === "poiLarge" || marker.type === "poiSmall") {
        const large = marker.type === "poiLarge";
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{
                    display: "block",
                    color: "white",
                    fontSize: large ? "10px" : "7px",
                    fontWeight: large ? 700 : 500,
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                    letterSpacing: large ? "0.12em" : "0.06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    padding: large ? "3px 9px" : "1px 5px",
                    borderRadius: "1px",
                    backgroundColor: large ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.1)",
                    backdropFilter: "blur(4px)",
                    border: `1px solid ${large ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
                    opacity: isSelected ? 1 : large ? 0.9 : 0.7,
                    boxShadow: isSelected
                        ? "0 0 0 1px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.6)"
                        : "0 2px 6px rgba(0,0,0,0.5)",
                }}>
                    {marker.label}
                </span>
            </div>
        );
    }

    return (
        <img
            src={marker.icon}
            alt={marker.label}
            width={30}
            height={30}
            style={{
                display: "block",
                filter: isSelected
                    ? "drop-shadow(0 0 6px white)"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
            }}
        />
    );
};

export const MapCanvas = forwardRef<HTMLDivElement, Props>(({
    map, scale, onMouseMove, visibleMarkers, selectedMarker, onMarkerClick
}, ref) => {
    return (
        <div
            ref={ref}
            style={{ position: "relative", display: "inline-block" }}
            onClick={() => onMarkerClick(null)}
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
                style={{ display: "block", width: "100%", height: "auto" }}
            />

            {map.markers
                .filter(marker => visibleMarkers[marker.type])
                .map(marker => (
                    <div
                        key={marker.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMarkerClick(selectedMarker?.id === marker.id ? null : marker);
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
                        {renderMarkerContent(marker, selectedMarker?.id === marker.id)}
                    </div>
                ))}
        </div>
    );
});

export default MapCanvas;