const STEAM_NEWS_URL =
    'ISteamNews/GetNewsForApp/v2/?appid=3065800&count=100&maxlength=0&format=json'

function secondsUntilNextTuesday() {
    const now = new Date()

    const next = new Date(now)

    next.setDate(
        now.getDate() +
        ((2 - now.getDay() + 7) % 7)
    )

    next.setHours(12, 1, 0, 0)

    // If Tuesday 12:01 already passed
    if (next <= now) {
        next.setDate(next.getDate() + 7)
    }

    return Math.floor(
        (next.getTime() - now.getTime()) / 1000
    )
}

export async function GET() {
    try {
        const response = await fetch(`https://api.steampowered.com/${STEAM_NEWS_URL}`)

        if (!response.ok) {
            throw new Error(`Steam API returned ${response.status}`)
        }

        const data = await response.json()

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": `public, s-maxage=${secondsUntilNextTuesday()}, stale-while-revalidate=300`,
            },
        })
    } catch (err) {
        return new Response(
            JSON.stringify({ error: 'Failed to fetch Steam news' }),
            { status: 502, headers: { "Content-Type": "application/json" } }
        )
    }
}