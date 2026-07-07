import { useEffect, useState } from 'react'
import './PatchNotesTab.css'

interface SteamNewsItem {
    gid: string
    title: string
    url: string
    contents: string
    date: number
    feedlabel: string
    feed_type: number
}

interface SteamNewsResponse {
    appnews: {
        newsitems: SteamNewsItem[]
    }
}

function PatchNotesTab() {
    const [news, setNews] = useState<SteamNewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadNews() {
            try {
                const response = await fetch('/api/steam-news')

                if (!response.ok) {
                    throw new Error('Failed to fetch Steam news.')
                }

                const data = (await response.json()) as SteamNewsResponse

                setNews(
                    data.appnews.newsitems.filter(
                        item => item.feedlabel === 'Community Announcements'
                    )
                )
                console.log(data.appnews.newsitems)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred.'
                )
            } finally {
                setLoading(false)
            }
        }

        loadNews()
    }, [])

    if (loading) {
        return (
            <div className="patch-notes-page">
                <h2>Loading patch notes...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="patch-notes-page">
                <h2>{error}</h2>
            </div>
        )
    }

    return (
        <div className="patch-notes-page">
            <div className="patch-notes-header">
                <span className="patch-notes-label">
                    // steam updates
                </span>

                <h2>Marathon Patch Notes</h2>
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
                            <span>
                                {String(index + 1).padStart(2, '0')}
                            </span>
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
                                {item.contents.length > 220
                                    ? item.contents.slice(0, 220) + '…'
                                    : item.contents}
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