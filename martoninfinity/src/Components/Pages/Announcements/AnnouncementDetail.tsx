import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { announcements } from "../../../Data/AnnouncementsData";
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
                <button className="announcements-back" onClick={() => navigate("/announcements")}>
                    ← Back to Announcements
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
            <button className="announcements-back" onClick={() => navigate("/announcements")}>
                ← Back to Announcements
            </button>

            <article className="announcement-detail-card">
                <header className="announcement-detail-header">
                    <span className="announcements-page-label">// announcement</span>
                    <h2 className="announcement-detail-title">{announcement.title}</h2>
                    <p className="announcement-detail-date">{formattedDate}</p>
                </header>

                <div className="announcement-detail-divider" />
                <div className="announcement-markdown">
                    <ReactMarkdown>{announcement.description}</ReactMarkdown>
                </div>
            </article >
        </div >
    );
}

export default AnnouncementDetail;