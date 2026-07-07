import { useEffect, useState } from 'react'
import './PatchNotesTab.css'

function PatchNotesTab() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadNews() {
            try {
                // Your backend endpoint
                const response = await fetch('/api/steam-news')

                if (!response.ok) {
                    throw new Error('Failed to fetch news')
                }

                const data = await response.json()
                setNews(data.appnews.newsitems)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadNews()
    }, [])

    if (loading) {
        return (
            <div className="tab-content-inner">
                <h2>Patch Notes</h2>
                <p>Loading latest updates...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="tab-content-inner">
                <h2>Patch Notes</h2>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="tab-content-inner">
            <h2>Patch Notes</h2>
            <p>Latest Marathon News from Steam</p>

            <div className="patch-notes-container">
                {news.map((item) => (
                    <div
                        className="patch-notes-info-section"
                        key={item.gid}
                    >
                        <h3>{item.title}</h3>

                        <small>
                            {new Date(item.date * 1000).toLocaleDateString()}
                        </small>

                        <p>{item.contents}</p>

                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="patch-notes-button"
                        >
                            Read Full Article →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatchNotesTab