import { useNavigate, useParams } from "react-router-dom";
import announcements from "../../../Data/announcements.json";
import "./AnnouncementDetail.css";

interface Announcement {
    id: number;
    title: string;
    date: string;
    description: string;
}

function AnnouncementDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const announcement = (announcements as Announcement[]).find(
        a => a.id === Number(id)
    );

    if (!announcement) {
        return (
            <div className="announcement-detail-page">
                <button className="announcements-back" onClick={() => navigate(-1)}>
                    ← back
                </button>
                <p className="announcement-detail-not-found">Announcement not found.</p>
            </div>
        );
    }

    const formattedDate = new Date(announcement.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="announcement-detail-page">
            <button className="announcements-back" onClick={() => navigate(-1)}>
                ← back
            </button>

            <article className="announcement-detail-card">
                <header className="announcement-detail-header">
                    <span className="announcements-page-label">// announcement</span>
                    <h2 className="announcement-detail-title">{announcement.title}</h2>
                    <p className="announcement-detail-date">{formattedDate}</p>
                </header>

                <div className="announcement-detail-divider" />

                <div className="announcement-detail-body">
                    <p>{announcement.description}</p>
                </div>
            </article>
        </div>
    );
}

export default AnnouncementDetail;