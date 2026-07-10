import type { Marker, GameMap } from "../../../Data/MapsData.ts";

import "./MapCanvas.css"

interface Props {
    map: GameMap;
    scale: number;
    onMouseMove: (pos: { x: number; y: number }) => void;
    visibleMarkers: Record<string, boolean>;
    selectedMarker: Marker | null;
    onMarkerClick: (marker: Marker | null) => void;
    ref?: React.Ref<HTMLDivElement>;
}

const renderMarkerContent = (marker: Marker, isSelected: boolean) => {
    if (marker.type === "poiLarge" || marker.type === "poiSmall") {
        const large = marker.type === "poiLarge";
        return (
            <div className="marker-label-wrapper">
                <span
                    className={
                        `marker-label ${large ? "marker-label--large" : "marker-label--small"}` +
                        (isSelected ? " marker-label--selected" : "")
                    }
                >
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

function MapCanvas({
    map, scale, onMouseMove, visibleMarkers, selectedMarker, onMarkerClick, ref
}: Props) {
    return (
        // eslint-disable-next-line react-doctor/no-static-element-interactions, react-doctor/click-events-have-key-events -- background
        // click-away convenience, not a standalone widget; an explicit keyboard-accessible
        // close button already exists (marker-overlay-close). A role/key-handler here would
        // announce the entire map as one giant interactive element and pollute the tab order.
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

            {map.markers.reduce<React.ReactNode[]>((acc, marker) => {
                if (!visibleMarkers[marker.type]) return acc;

                acc.push(
                    <button
                        type="button"
                        key={marker.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMarkerClick(selectedMarker?.id === marker.id ? null : marker);
                        }}
                        aria-label={marker.label}
                        aria-pressed={selectedMarker?.id === marker.id}
                        style={{
                            position: "absolute",
                            left: `${marker.x * 100}%`,
                            top: `${marker.y * 100}%`,
                            transform: `translate(-50%, -50%) scale(${1 / scale})`,
                            transformOrigin: "center",
                            cursor: 'url("/cursors/pointer.svg") 2 0, pointer',
                            background: "none",
                            border: "none",
                            padding: 0,
                        }}
                    >
                        {renderMarkerContent(marker, selectedMarker?.id === marker.id)}
                    </button>
                );

                return acc;
            }, [])}
        </div>
    );
}

export default MapCanvas;