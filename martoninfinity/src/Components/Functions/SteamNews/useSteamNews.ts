import { useEffect, useSyncExternalStore } from 'react'

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

interface NewsState {
    news: SteamNewsItem[]
    loading: boolean
    error: string | null
    loaded: boolean // distinct from news.length — a legitimately empty
    // result set should still count as "fetched", not
    // trigger a refetch on the next mount
}

let state: NewsState = { news: [], loading: true, error: null, loaded: false }
const listeners = new Set<() => void>()

function setState(next: Partial<NewsState>) {
    state = { ...state, ...next }
    listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function getSnapshot() {
    return state
}

let inFlightRequest: Promise<void> | null = null

async function fetchNews(): Promise<void> {
    if (state.loaded) return
    if (inFlightRequest) return inFlightRequest

    inFlightRequest = (async () => {
        try {
            const response = await fetch('/api/steam-news?_=' + Date.now())

            if (!response.ok) {
                throw new Error('Failed to fetch news')
            }

            const data = (await response.json()) as SteamNewsResponse

            const filtered = data.appnews.newsitems.filter(
                (item) => item.feedlabel === 'Community Announcements'
            )

            setState({ news: filtered, loading: false, loaded: true, error: null })
        } catch (err) {
            setState({
                loading: false,
                error: err instanceof Error ? err.message : 'An unknown error occurred',
            })
        } finally {
            inFlightRequest = null
        }
    })()

    return inFlightRequest
}

export function useSteamNews() {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot)

    useEffect(() => {
        fetchNews()
    }, [])

    return snapshot
}