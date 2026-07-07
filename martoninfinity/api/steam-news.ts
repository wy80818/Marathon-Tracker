import { STEAM_NEWS_URL } from '../config/steam.js'

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

export async function GET(request: Request) {
    console.log("FUNCTION HIT")

    return new Response(
        JSON.stringify({
            test: "working"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}

// export default async function handler() {
//     console.log("Steam API function started")

//     try {
//         const response = await fetch(
//             `https:api.steampowered.com/${STEAM_NEWS_URL}`
//         )

//         if (!response.ok) {
//             throw new Error(`Steam API returned ${response.status}`)
//         }

//         console.log("Steam responded:", response.status)

//         const data = await response.json()

//         console.log("JSON received")

//         For development ONLY
//         return new Response(JSON.stringify(data), {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-store',
//             },
//         })
//         return new Response(JSON.stringify(data), {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control':
//                     `public, s-maxage=${secondsUntilNextTuesday()}, stale-while-revalidate=300`,
//             },
//         })
//     } catch (error) {
//         console.error("Steam error:", error)

//         return new Response(
//             JSON.stringify({
//                 error:
//                     error instanceof Error
//                         ? error.message
//                         : 'Unknown error',
//             }),
//             {
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         )
//     }
// }