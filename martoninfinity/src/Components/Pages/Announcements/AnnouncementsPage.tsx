import { Link, useNavigate } from "react-router-dom";
import { announcements } from "../../../Data/AnnouncementsData";
import "./AnnouncementsPage.css";

interface Announcement {
    id: number;
    title: string;
    date: string;
    description: string;
}

function AnnouncementsPage() {
    const navigate = useNavigate();

    const sorted = (announcements as Announcement[]).toSorted(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="announcements-page">
            <div className="announcements-page-header">
                <button type="button" className="announcements-back" onClick={() => navigate("/")}>
                    ← Back to Home
                </button>
                <div className="announcements-page-title">
                    <span className="announcements-page-label">// Announcements</span>
                    <h2>All Announcements</h2>
                </div>
            </div>

            <div className="announcements-page-list">
                {sorted.map((item, index) => (
                    <Link
                        key={item.id}
                        to={`/announcements/${item.id}`}
                        className="announcements-page-bubble"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="announcements-page-bubble-left">
                            <span className="announcements-page-index">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <div className="announcements-page-bubble-right">
                            <div className="announcements-page-bubble-top">
                                <p className="announcements-page-title-text">{item.title}</p>
                                <p className="announcements-page-date">{new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}</p>
                            </div>
                            <p className="announcements-page-desc">
                                {item.description.length > 150 ? item.description.slice(0, 150) + "…" : item.description}
                            </p>
                            <span className="announcements-page-read-more">read more →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AnnouncementsPage;