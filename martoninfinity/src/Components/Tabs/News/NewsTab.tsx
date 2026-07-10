import { Link } from 'react-router-dom'
import { useSteamNews } from '../../Functions/SteamNews/useSteamNews'

import './NewsTab.css'
import Error from '../../Pages/Error/Error'

function cleanSteamDescription(text: string) {
    const cleaned = text
        // Remove images
        .replace(/<img[^>]*>/gi, '')

        // Convert line breaks to spaces (this is a single-line preview, not
        // a multi-paragraph render, so no need to preserve them as \n)
        .replace(/<br\s*\/?>/gi, ' ')

        // Remove HTML tags
        .replace(/<[^>]*>/g, '')

        // Dynamic links (Steam store/YouTube embeds) — no inner text, and
        // a bare URL would just be noise in a short preview, so drop entirely
        .replace(/\[dynamiclink[^\]]*\]\s*\[\/dynamiclink\]/gi, '')

        // Tables — data-heavy stat blocks read as gibberish once flattened
        // to plain text ("Tier Cost Score Target... Bronze 500 3,000..."),
        // so cut the whole block rather than let it bleed into the snippet
        .replace(/\[table[^\]]*\][\s\S]*?\[\/table\]/gi, '')

        // Headings / bold / italic / underline / strike — keep inner text
        .replace(/\[h\d\](.*?)\[\/h\d\]/gi, '$1')
        .replace(/\[b\](.*?)\[\/b\]/gi, '$1')
        .replace(/\[i\](.*?)\[\/i\]/gi, '$1')
        .replace(/\[u\](.*?)\[\/u\]/gi, '$1')
        .replace(/\[strike\](.*?)\[\/strike\]/gi, '$1')

        // Quotes — keep the quoted text, drop attribution
        .replace(/\[quote(?:=.*?)?\](.*?)\[\/quote\]/gis, '$1')

        // Links — keep the label, quoted or unquoted [url=] form, and
        // bare [url]URL[/url] form
        .replace(/\[url=(?:"|&quot;)?.*?(?:"|&quot;)?\](.*?)\[\/url\]/gis, '$1')
        .replace(/\[url\](.*?)\[\/url\]/gi, '$1')

        // List wrappers — unwrap, bullets handled separately below
        .replace(/\[\/?list\]/gi, '')
        .replace(/\[\/?olist\]/gi, '')

        // Bullet markers — no bullet glyph in a plain-text preview; just
        // space items apart so they don't run together word-to-word
        .replace(/\[\*\]\s*/gi, ' ')

        // Remove remaining BBCode
        .replace(/\[.*?\]/g, '')

        // Collapse whitespace — multiple spaces/newlines all become one
        // space, since this renders as a single flowing preview line
        .replace(/\s+/g, ' ')
        .trim()

    // Some posts are entirely image/table/dynamiclink content with no
    // prose (e.g. a pure stat-block or embed-only announcement) — once
    // those are stripped for the preview, nothing text-worthy is left
    return cleaned || 'Read the full update'
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

                <p className="news-loading-text">
                    <span className="news-spinner" />
                    Loading latest updates...
                </p>

                <div className="news-list">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="news-item news-skeleton"
                            style={{ animationDelay: `${index * 0.12}s` }}
                        >
                            <div className="news-item-left skeleton-block" />
                            <div className="news-item-right">
                                <div className="news-item-top">
                                    <div className="skeleton-block skeleton-title" />
                                    <div className="skeleton-block skeleton-date" />
                                </div>
                                <div className="skeleton-block skeleton-line" />
                                <div className="skeleton-block skeleton-line short" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <Error
                message="Steam API Error Encountered"
                sub={"An issue has occured with the Steam API"}
                backlink="/home"
                backmsg="Back to Home"
            />
        )
    }

    return (
        <div className="news-page">
            <div className="news-header">
                <span className="news-label">
                    // Steam Updates
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