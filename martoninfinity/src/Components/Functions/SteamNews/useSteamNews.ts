import { useEffect, useState } from 'react'

export interface SteamNewsItem {
    gid: string
    title: string
    url: string
    contents: string
    date: number
    feedlabel: string
}

interface SteamNewsResponse {
    appnews: {
        newsitems: SteamNewsItem[]
    }
}

// Module-level cache so navigating between the list and an article
// (or landing directly on /news/:gid) doesn't trigger duplicate fetches.
let cachedNews: SteamNewsItem[] | null = null
let inFlightRequest: Promise<SteamNewsItem[]> | null = null

async function fetchNews(): Promise<SteamNewsItem[]> {
    if (cachedNews) return cachedNews
    if (inFlightRequest) return inFlightRequest

    inFlightRequest = (async () => {
        const response = await fetch('/api/steam-news?_=' + Date.now())

        if (!response.ok) {
            throw new Error('Failed to fetch news')
        }

        const data = (await response.json()) as SteamNewsResponse

        const filtered = data.appnews.newsitems.filter(
            (item) => item.feedlabel === 'Community Announcements'
        )

        cachedNews = filtered
        return filtered
    })()

    try {
        return await inFlightRequest
    } finally {
        inFlightRequest = null
    }
}

export function useSteamNews() {
    const [news, setNews] = useState<SteamNewsItem[]>(cachedNews ?? [])
    const [loading, setLoading] = useState(!cachedNews)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (cachedNews) {
            setNews(cachedNews)
            setLoading(false)
            return
        }

        let cancelled = false

        fetchNews()
            .then((items) => {
                if (!cancelled) setNews(items)
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'An unknown error occurred'
                    )
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [])

    return { news, loading, error }
}