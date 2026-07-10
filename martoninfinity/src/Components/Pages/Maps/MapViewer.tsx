import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

import "./MapViewer.css";
import Error from "../Error/Error";

import type { Marker } from "../../../Data/MapsData";
import { maps } from "../../../Data/MapsData";
import MapCanvas from "./MapCanvas";
import MapSidebar from "./MapSidebar";
import MarkerPopup from "./MarkerPopup";

const WRAPPER_STYLE = { width: "100%", height: "100%" };
const CONTENT_STYLE = { pointerEvents: "auto" as const };

const MapViewer = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    const mapExists = mapId ? maps.some(m => m.id === mapId) : true;
    const initialMapId = mapId && mapExists ? mapId : maps[0].id;

    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [displayedMapId, setDisplayedMapId] = useState(initialMapId);
    const [selectedMapId, setSelectedMapId] = useState(initialMapId);
    const [scale, setScale] = useState(0.85);
    const [isHoveringMap, setIsHoveringMap] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [visibleMarkers, setVisibleMarkers] = useState<Record<string, boolean>>({});
    const [imageReady, setImageReady] = useState(false);
    const [transformKey, setTransformKey] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const mapCanvasRef = useRef<HTMLDivElement>(null);
    const transformRef = useRef<ReactZoomPanPinchRef>(null);

    const currentMap = maps.find(m => m.id === displayedMapId)!;

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

    // Updates map when URL changes
    useEffect(() => {
        if (!mapId) return;

        const exists = maps.some(m => m.id === mapId);
        if (exists && mapId !== selectedMapId) {
            setSelectedMapId(mapId);
        }
        // intentionally one-directional (URL -> state). Adding selectedMapId here would make
        // this effect re-fire the instant setSelectedMapId is called from the
        // sidebar onClick, before the router has updated `mapId`, reverting the click.
        // react-doctor-disable-next-line react-doctor/exhaustive-deps 
    }, [mapId]);

    // Resets marker filters on map change.
    
    useEffect(() => {
        const defaults: Record<string, boolean> = {};
        currentMap.markers.forEach(marker => {
            defaults[marker.type] = true;
        });

        setVisibleMarkers(defaults);
        setSelectedMarker(null);
         
        // currentMapis a pure lookup (maps.find) over displayedMapId against a static `maps`
        // array, so it can't change independently of displayedMapId.
        // react-doctor-disable-next-line react-doctor/exhaustive-deps 
    }, [displayedMapId]);

    // Map fade out transition
    useEffect(() => {
        if (selectedMapId === displayedMapId) return;

        setImageReady(false);

        const FADE_DURATION = 100;

        const timer = setTimeout(() => {
            setDisplayedMapId(selectedMapId);
        }, FADE_DURATION);

        return () => clearTimeout(timer);
    }, [selectedMapId, displayedMapId]);

    // Map fade in transition
    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.src = currentMap.image;
        img.onload = () => {
            if (cancelled) return;
            requestAnimationFrame(() => {
                transformRef.current?.resetTransform(0);
                setImageReady(true);
            });
        };
        return () => { cancelled = true; };
    }, [currentMap.image]);

    // Close marker popup on Escape
    useEffect(() => {
        if (!selectedMarker) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedMarker(null);
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selectedMarker]);

    // Error page
    if (mapId && !mapExists) {
        return (
            <Error
                message="Map not found."
                sub={`No map matches "${mapId}".`}
                backlink="/maps"
                backmsg="Back to Maps"
            />
        );
    }

    return (
        <div className="map-window">
            <div className="map-layout">
                <MapSidebar
                    currentMap={currentMap}
                    selectedMapId={selectedMapId}
                    onSelectMap={(id) => {
                        setSelectedMapId(id);
                        navigate(`/maps/${id}`, { replace: true });
                    }}
                    visibleMarkers={visibleMarkers}
                    setVisibleMarkers={setVisibleMarkers}
                    onBack={() => navigate("/maps")}
                />

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
                            minScale={0.7}
                            maxScale={8}
                            smooth
                            wheel={{ step: 0.005 }}
                            doubleClick={{ step: 1.5 }}
                            velocityAnimation={{
                                animationTime: 300,
                                animationType: "easeOutCubic",
                            }}
                            onTransform={({ state }) => {
                                setScale(state.scale);
                                setTransformKey(prev => prev + 1);
                            }}
                        >
                            <div
                                className="map-img"
                                style={{ position: "relative", width: "100%", height: "100%" }}
                                onMouseEnter={() => setIsHoveringMap(true)}
                                onMouseLeave={() => setIsHoveringMap(false)}
                            >
                                <TransformComponent wrapperStyle={WRAPPER_STYLE} contentStyle={CONTENT_STYLE}>
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
                                        <MarkerPopup
                                            marker={selectedMarker}
                                            left={pos.left}
                                            top={pos.top}
                                            isRightSide={isRightSide}
                                            transformKey={transformKey}
                                            onClose={() => setSelectedMarker(null)}
                                        />
                                    );
                                })()}

                                <div className="zoom-buttons">
                                    <button
                                        type="button"
                                        onClick={() => transformRef.current?.centerView(0.85, 300)}
                                    >
                                        Reset
                                    </button>
                                </div>

                                {isHoveringMap && (
                                    <div className="map-cursor-debug">
                                        x: {cursorPos.x}<br />y: {cursorPos.y}
                                    </div>
                                )}
                            </div>
                        </TransformWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapViewer;