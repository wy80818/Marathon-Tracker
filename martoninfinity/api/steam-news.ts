export async function GET() {
    const response = await fetch(
        'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3065800&count=10&maxlength=500&format=json'
    )

    const data = await response.json()

    return Response.json(data, {
        headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
    })
}