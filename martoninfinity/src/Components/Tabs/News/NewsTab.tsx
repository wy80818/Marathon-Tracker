import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
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

// Escapes regex special characters so the raw search query can be dropped
// safely into a RegExp (otherwise typing e.g. "3.24" or "(beta)" would
// throw or match unintended patterns)
function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Splits text around every match of `query` and wraps matches in <mark>.
// Returns the original string untouched (as a single-element array) when
// the query is empty, so the common no-search-yet case skips the split work.
function highlightMatches(text: string, query: string): React.ReactNode {
    const trimmed = query.trim()
    if (!trimmed) return text

    const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, 'gi'))
    if (parts.length === 1) return text

    return parts.map((part, i) =>
        part.toLowerCase() === trimmed.toLowerCase()
            ? <mark key={i} className="news-search-highlight">{part}</mark>
            : part
    )
}

function NewsTab() {
    const { news, loading, error } = useSteamNews()
    const [query, setQuery] = useState('')

    // Clean descriptions once per news list, not once per render/keystroke
    const newsWithPreview = useMemo(
        () => news.map((item) => ({
            ...item,
            preview: cleanSteamDescription(item.contents).slice(0, 220),
        })),
        [news]
    )

    const filteredNews = useMemo(() => {
        const trimmed = query.trim().toLowerCase()
        if (!trimmed) return newsWithPreview

        return newsWithPreview.filter(
            (item) =>
                item.title.toLowerCase().includes(trimmed) ||
                item.preview.toLowerCase().includes(trimmed)
        )
    }, [newsWithPreview, query])

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

            <div className="news-search">
                <input
                    type="text"
                    className="news-search-input"
                    placeholder="Search news..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search news"
                />
                {query && (
                    <button
                        type="button"
                        className="news-search-clear"
                        onClick={() => setQuery('')}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>

            {filteredNews.length === 0 ? (
                <p className="news-search-empty">
                    No results for "{query}"
                </p>
            ) : (
                <div className="news-list">
                    {filteredNews.map((item, index) => (
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
                                    <h3>{highlightMatches(item.title, query)}</h3>

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
                                    {highlightMatches(item.preview, query)}
                                </p>

                                <span className="news-item-read">
                                    Read full article →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NewsTab