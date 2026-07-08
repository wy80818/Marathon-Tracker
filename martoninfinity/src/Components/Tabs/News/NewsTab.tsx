import { Link } from 'react-router-dom'
import { useSteamNews } from '../../Functions/SteamNews/useSteamNews'
import './NewsTab.css'

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

function NewsTab() {
    const { news, loading, error } = useSteamNews()

    if (loading) {
        return (
            <div className="news-page">
                <div className="news-header">
                    <span className="news-label">
                        // Steam Updates
                    </span>
                    <h2>News</h2>
                </div>
                <p>Loading latest updates... </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="news-page">
                <div className="news-header">
                    <span className="news-label">
                        // Steam updates
                    </span>
                    <h2>News</h2>
                </div>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="news-page">
            <div className="news-header">
                <span className="news-label">
                // Steam updates
                </span>
                <h2>News</h2>
            </div>

            <div className="news-list">
                {news.map((item, index) => (
                    <Link
                        key={item.gid}
                        to={`/news/${item.gid}`}
                        state={{ item }}
                        className="news-item"
                        style={{
                            animationDelay: `${index * 0.05}s`,
                        }}
                    >
                        <div className="news-item-left">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="news-item-right">
                            <div className="news-item-top">
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

                            <span className="news-item-read">
                                Read full article →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default NewsTab