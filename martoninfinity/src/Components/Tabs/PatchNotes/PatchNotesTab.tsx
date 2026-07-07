import { useEffect, useState } from 'react'
import './PatchNotesTab.css'

// interface SteamNewsItem {
//     gid: string
//     title: string
//     url: string
//     contents: string
//     date: number
//     feedlabel: string
// }

function cleanSteamDescription(text: string) {
    return text
        // Remove images
        .replace(/<img[^>]*>/gi, '')

        // Convert line breaks
        .replace(/<br\s*\/?>/gi, '\n')

        // Remove HTML tags
        .replace(/<[^>]*>/g, '')

        // Convert BBCode
        .replace(/\[h\d\](.*?)\[\/h\d\]/gi, '$1')
        .replace(/\[b\](.*?)\[\/b\]/gi, '$1')
        .replace(/\[i\](.*?)\[\/i\]/gi, '$1')
        .replace(/\[list\]/gi, '')
        .replace(/\[\/list\]/gi, '')
        .replace(/\[\*\]/gi, '• ')

        // Remove remaining BBCode
        .replace(/\[.*?\]/g, '')

        // Clean whitespace
        .replace(/\n\s*\n/g, '\n')
        .trim()
}

function PatchNotesTab() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadNews() {
            try {
                // Your backend endpoint
                const response = await fetch('/api/steam-news?_=' + Date.now())

                if (!response.ok) {
                    throw new Error('Failed to fetch news')
                }

                const data = await response.json()

                console.log(
                    data.appnews.newsitems
                )

                setNews(
                    data.appnews.newsitems.filter(
                        (item) => item.feedlabel === 'Community Announcements'
                    )
                ) 
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
        <div className="patch-notes-page">
            <div className="patch-notes-header">
                <span className="patch-notes-label">
                // steam updates
                </span>

                <h2>Patch Notes</h2>
            </div>

            <div className="patch-notes-list">
                {news.map((item, index) => (
                    <a
                        key={item.gid}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="patch-note"
                        style={{
                            animationDelay: `${index * 0.05}s`,
                        }}
                    >
                        <div className="patch-note-left">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="patch-note-right">
                            <div className="patch-note-top">
                                <h3>{item.title}</h3>

                                <span>
                                    {new Date(
                                        item.date * 1000
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>

                            <p>
                                {cleanSteamDescription(item.contents).slice(0, 220)}
                            </p>

                            <span className="patch-note-read">
                                Read full article →
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default PatchNotesTab