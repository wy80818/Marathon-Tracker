import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSteamNews, type SteamNewsItem } from '../../Functions/SteamNews/useSteamNews'
import { formatSteamContent } from '../../Functions/SteamNews/formatSteamContent'

import DOMPurify from 'dompurify'

import './NewsArticle.css'
import Error from "../Error/Error";
import BackToTop from '../../Functions/BackToTop/BackToTop'

// Pulls the 11-char video ID out of any common YouTube URL shape
// (watch?v=, youtu.be/, or an already-embedded /embed/ link)
function extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
    return match ? match[1] : null
}

// Replaces a clicked .yt-preview thumbnail with a real YouTube embed, so
// the video plays inline on this page instead of opening a new tab. Uses
// YouTube's own player UI (controls, progress bar, fullscreen, share) as-is.
// Returns a cleanup function to remove the fullscreenchange listener.
function mountYouTubeEmbed(link: HTMLAnchorElement): (() => void) | undefined {
    const videoId = extractYouTubeId(link.href)
    if (!videoId) {
        window.open(link.href, '_blank', 'noopener,noreferrer')
        return
    }

    const wrapper = document.createElement('div')
    wrapper.className = 'yt-embed-wrapper'
    wrapper.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    `
    link.replaceWith(wrapper)

    // Some browsers mis-layout the embedded YouTube player when fullscreen
    // is triggered via the 'f' keyboard shortcut inside the iframe (as
    // opposed to clicking their fullscreen button), leaving a blank/broken
    // frame. Forcing a reflow on our wrapper after any fullscreen change
    // clears up stale layout in the cases where that's the cause.
    function handleFullscreenChange() {
        void wrapper.offsetHeight // reading layout forces a reflow
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
}

function NewsArticle() {
    const { gid } = useParams<{ gid: string }>()
    const location = useLocation()
    const navigate = useNavigate()

    const stateItem = (location.state as { item?: SteamNewsItem } | null)?.item
    const { news, loading, error } = useSteamNews()
    const item = stateItem ?? news.find((n) => n.gid === gid)

    // Ref + effect must run unconditionally (before any early return) so
    // hook order stays stable across the loading/error/not-found branches
    const contentRef = useRef<HTMLDivElement>(null)
    const embedCleanupsRef = useRef<Array<() => void>>([])

    useEffect(() => {
        const container = contentRef.current
        if (!container) return

        function handleClick(e: MouseEvent) {
            const link = (e.target as HTMLElement).closest('a.yt-preview') as HTMLAnchorElement | null
            if (!link) return

            e.preventDefault()
            const cleanup = mountYouTubeEmbed(link)
            if (cleanup) embedCleanupsRef.current.push(cleanup)
        }

        container.addEventListener('click', handleClick)
        return () => {
            container.removeEventListener('click', handleClick)
            embedCleanupsRef.current.forEach((fn) => fn())
            embedCleanupsRef.current = []
        }
    }, [item?.contents])

    if (!stateItem && loading) {
        return (
            <div className="news-detail-page">
                <button type="button" className="news-detail-back" onClick={() => navigate('/news')}>
                    ← Back to News
                </button>
                <p className="news-detail-not-found">Loading article...</p>
            </div>
        )
    }

    if (!stateItem && error) {
        return (
            <div className="news-detail-page">
                <button type="button" className="news-detail-back" onClick={() => navigate('/news')}>
                    ← Back to news
                </button>
                <p className="news-detail-not-found">{error}</p>
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
        <div className="news-detail-page">
            <button type="button" className="news-detail-back" onClick={() => navigate('/news')}>
                ← Back to News
            </button>

            <div className="news-detail-card">
                <div className="news-detail-header">
                    <h1 className="news-detail-title">{item.title}</h1>
                    <div className="news-detail-meta">
                        <p className="news-detail-date">{formattedDate}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-detail-source-link"
                        >
                            View on Steam ↗
                        </a>
                    </div>
                </div>

                <div className="news-detail-divider" />

                <div
                    ref={contentRef}
                    className="news-markdown"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatSteamContent(item.contents)) }}
                />
            </div>

            <BackToTop />
        </div>
    )
}

export default NewsArticle