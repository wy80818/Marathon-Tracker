import { useEffect, useState, useCallback } from 'react'
import './BackToTop.css'

const SCROLL_SHOW_THRESHOLD_PX = 400

function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > SCROLL_SHOW_THRESHOLD_PX)
        }
        handleScroll() // in case the page mounts already scrolled
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <button
            type="button"
            className={`back-to-top ${visible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
        >
            <span className="back-to-top-glyph">▲</span>
            <span className="back-to-top-label">TOP</span>
        </button>
    )
}

export default BackToTop