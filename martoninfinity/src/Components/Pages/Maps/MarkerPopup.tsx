import ReactMarkdown from "react-markdown";
import type { Marker } from "../../../Data/MapsData";

interface Props {
    marker: Marker;
    left: number;
    top: number;
    isRightSide: boolean;
    transformKey: number;
    onClose: () => void;
}

// Hoisted to module scope — this object was being recreated on every render
// of MapViewer before (a small perf nit worth fixing while extracting anyway)
const markdownComponents = {
    strong: ({ children }: { children?: React.ReactNode }) => ( // **critical detail**
        <strong style={{ color: 'var(--color-red)', fontStyle: 'normal' }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => ( // *item*
        <strong style={{ color: 'var(--color-lime)', fontStyle: 'normal' }}>{children}</strong>
    ),
    code: ({ children }: { children?: React.ReactNode }) => ( // `location`
        <strong style={{ color: 'var(--color-cyan)', fontStyle: 'normal' }}>{children}</strong>
    ),
};

function MarkerPopup({ marker, left, top, isRightSide, transformKey, onClose }: Props) {
    return (
        <div
            className="marker-overlay"
            data-transform-key={transformKey}
            style={{
                left,
                top,
                transform: isRightSide
                    ? "translate(calc(-100% - 20px), -50%)"
                    : "translate(20px, -50%)"
            }}
        >
            <div className="marker-overlay-card" onClick={e => e.stopPropagation()}>
                <div className="marker-overlay-header">
                    <img src={marker.icon} width={28} height={28} alt={marker.label} />
                    <h4>{marker.label}</h4>
                </div>
                <ReactMarkdown components={markdownComponents}>
                    {marker.description}
                </ReactMarkdown>
                <button type="button" className="marker-overlay-close" onClick={onClose}>×</button>
            </div>
        </div>
    );
}

export default MarkerPopup;