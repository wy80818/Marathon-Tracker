import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSteamNews, type SteamNewsItem } from '../../Functions/SteamNews/useSteamNews'
import { formatSteamContent } from '../../Functions/SteamNews/formatSteamContent'

import './NewsArticle.css'
import Error from "../Error/Error";

function NewsArticle() {
    const { gid } = useParams<{ gid: string }>()
    const location = useLocation()
    const navigate = useNavigate()

    // Fast path: Link passed the item via router state (no refetch needed)
    const stateItem = (location.state as { item?: SteamNewsItem } | null)?.item

    // Fallback: direct navigation / page refresh has no state, so fall back
    // to the shared (cached) news fetch and find the item by gid.
    const { news, loading, error } = useSteamNews()
    const item = stateItem ?? news.find((n) => n.gid === gid)

    if (!stateItem && loading) {
        return (
            <div className="announcement-detail-page">
                <button className="announcement-detail-back" onClick={() => navigate('/news')}>
                    ← Back to News
                </button>
                <p className="announcement-detail-not-found">Loading article...</p>
            </div>
        )
    }

    if (!stateItem && error) {
        return (
            <div className="announcement-detail-page">
                <button className="announcement-detail-back" onClick={() => navigate('/news')}>
                    ← Back to news
                </button>
                <p className="announcement-detail-not-found">{error}</p>
            </div>
        )
    }

    if (!item) {
        return (
            <Error
                message="Article not found."
                sub={`The article belonging to ID = ${gid} doesn't exist or has been moved.`}
                backlink="/news"
                backmsg="Back to News"
            />
        )
    }

    const formattedDate = new Date(item.date * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="announcement-detail-page">
            <button className="announcement-detail-back" onClick={() => navigate('/news')}>
                ← Back to News
            </button>

            <div className="announcement-detail-card">
                <div className="announcement-detail-header">
                    <h1 className="announcement-detail-title">{item.title}</h1>
                    <div className="announcement-detail-meta">
                        <p className="announcement-detail-date">{formattedDate}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="announcement-detail-source-link"
                        >
                            View on Steam ↗
                        </a>
                    </div>
                </div>

                <div className="announcement-detail-divider" />

                <div
                    className="announcement-markdown"
                    // Content is sanitized in formatSteamContent (scripts, event
                    // handlers, and javascript: URIs are stripped) before render.
                    dangerouslySetInnerHTML={{ __html: formatSteamContent(item.contents) }}
                />
            </div>
        </div>
    )
}

export default NewsArticle