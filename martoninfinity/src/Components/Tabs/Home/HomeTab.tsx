import { useNavigate } from "react-router-dom";
import { announcements } from "../../../Data/AnnouncementsData";
import "./HomeTab.css";

interface Announcement {
    id: number;
    title: string;
    date: string;
    description: string;
}

function HomeTab() {
    const navigate = useNavigate();

    const sorted = [...(announcements as Announcement[])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const hasMore = sorted.length > 3;

    return (
        <div className="tab-content-inner">
            <div className="home-layout">
                <div className="home-main">
                    <h2>Home Screen</h2>
                    <p>Select a tab to navigate through the application.</p>
                    <p>Any tab with an icon (not a "!") has features implemented that can be used!</p>
                </div>
                <div className="announcements">
                    <span className="announcements-label">// announcements</span>
                    {sorted.slice(0, 3).map(item => (
                        <div
                            key={item.id}
                            className="announcement-bubble"
                            onClick={() => navigate(`/announcements/${item.id}`)}
                        >
                            <p className="bubble-title">{item.title}</p>
                            <p className="bubble-date">{new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}</p>
                            <p className="bubble-desc">
                                {item.description.length > 100 ? item.description.slice(0, 100) + "…" : item.description}
                            </p>
                        </div>
                    ))}
                    {hasMore && (
                        <button
                            className="announcements-toggle"
                            onClick={() => navigate("/announcements")}
                        >
                            ... view all
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeTab;