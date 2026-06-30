import { Link } from "react-router-dom";
import { maps } from "../../../Data/MapsData";
import "./MapsTab.css";

const MapsTab = () => {
    return (
        <div className="maps-tab">
            <h2>Maps</h2>

            <div className="maps-tab-grid">
                {maps.map(map => (
                    <Link
                        key={map.id}
                        to={`/maps/${map.id}`}
                        className="maps-tab-card"
                    >
                        <img
                            src={map.mapIcon}
                            alt={map.name}
                            className="maps-tab-thumb"
                        />
                        <span>{map.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MapsTab;