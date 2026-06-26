import { useNavigate } from "react-router-dom";
import "./Error.css";

function Error() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-card">
                <span className="error-label">// error</span>
                <h2 className="error-code">404</h2>
                <p className="error-message">Page not found.</p>
                <div className="error-divider" />
                <p className="error-sub">The page you're looking for doesn't exist or has been moved.</p>
                <button className="announcements-back" onClick={() => navigate("/")}>
                    ← back to home
                </button>
            </div>
        </div>
    );
}

export default Error;