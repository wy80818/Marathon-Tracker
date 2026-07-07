export default async function handler(req: Request) {
    const response = await fetch(
        'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3065800&count=10&maxlength=500&format=json'
    )

    const data = await response.json()

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control':
                'public, s-maxage=300, stale-while-revalidate=600',
        },
    })
}