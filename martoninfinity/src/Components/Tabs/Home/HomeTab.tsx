import announcements from "../../../Data/announcements.json";
import "./HomeTab.css";

interface Announcement {
    id: number;
    title: string;
    date: string;
    description: string;
}

function HomeTab() {
    const sorted = [...(announcements as Announcement[])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="tab-content-inner">
            <div className="home-layout">
                <div className="home-main">
                    <h2>Home Screen</h2>
                    <p>Select a tab to navigate through the application.</p>
                </div>
                <div className="announcements">
                    <span className="announcements-label">// announcements</span>
                    {sorted.map(item => (
                        <div key={item.id} className="announcement-bubble">
                            <p className="bubble-title">{item.title}</p>
                            <p className="bubble-date">{new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}</p>
                            <p className="bubble-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeTab;