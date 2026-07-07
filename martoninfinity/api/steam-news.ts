import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    try {
        const response = await fetch(
            'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3065800&count=10&maxlength=500&format=json'
        )

        if (!response.ok) {
            throw new Error(`Steam API returned ${response.status}`)
        }

        const data = await response.json()

        // Cache on Vercel's CDN for 5 minutes
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=300, stale-while-revalidate=600'
        )

        res.status(200).json(data)
    } catch (err) {
        console.error(err)

        res.status(500).json({
            error: 'Failed to fetch Steam news.',
        })
    }
}