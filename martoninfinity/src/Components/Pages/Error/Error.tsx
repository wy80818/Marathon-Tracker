import { useNavigate } from "react-router-dom";
import "./Error.css";

interface ErrorProps {
    code?: string;
    message?: string;
    sub?: string;
    backlink?: string;
    backmsg?: string;
}

function Error({
    code = "404",
    message = "Page not found.",
    sub = "The page you're looking for doesn't exist or has been moved.",
    backlink = "/",
    backmsg = "Back to Home"
}: ErrorProps) {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-card">
                <span className="error-label">// error</span>
                <h2 className="error-code">{code}</h2>
                <p className="error-message">{message}</p>
                <div className="error-divider" />
                <p className="error-sub">{sub}</p>
                <button className="announcements-back" onClick={() => navigate(backlink)}>
                    ← {backmsg}
                </button>
            </div>
        </div>
    );
}

export default Error;