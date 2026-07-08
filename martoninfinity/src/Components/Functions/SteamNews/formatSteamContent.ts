// Converts Steam's mixed BBCode + HTML content into a sanitized HTML string
// suitable for dangerouslySetInnerHTML. Preserves headings, bold/italic,
// lists, links, and images so the full article reads properly in-app.
//
// Bullet handling is intentionally lenient: Steam patch notes are hand-typed
// by devs and are inconsistent — some wrap bullets in a proper
// [list]...[/list]/[*] block, some use [olist] for numbered lists, some
// leave [*] markers with no wrapper at all, and a lot just type plain "-" or
// "•" at the start of a line with no BBCode. All of these are grouped by a
// line-based pass below so intro text sharing a line/paragraph with a list
// (very common — "Changes:\n[*]Fix A\n[*]Fix B" with no blank line) doesn't
// break the list apart.

function convertListBlock(inner: string, ordered: boolean): string {
    const items = inner
        .split(/\[\*\]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        // Collapse any internal newlines inside a single list item so the
        // whole <ul>/<ol> stays on one line for the line-based pass below.
        .map((s) => `<li>${s.replace(/\s*\n+\s*/g, ' ')}</li>`)
        .join('')
    return ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`
}

function convertBBCode(text: string): string {
    let out = text

    // Headings
    out = out.replace(/\[h1\](.*?)\[\/h1\]/gis, '<h1>$1</h1>')
    out = out.replace(/\[h2\](.*?)\[\/h2\]/gis, '<h2>$1</h2>')
    out = out.replace(/\[h3\](.*?)\[\/h3\]/gis, '<h3>$1</h3>')
    out = out.replace(/\[h[4-6]\](.*?)\[\/h[4-6]\]/gis, '<h4>$1</h4>')

    // Basic inline styles
    out = out.replace(/\[b\](.*?)\[\/b\]/gis, '<strong>$1</strong>')
    out = out.replace(/\[i\](.*?)\[\/i\]/gis, '<em>$1</em>')
    out = out.replace(/\[u\](.*?)\[\/u\]/gis, '<u>$1</u>')
    out = out.replace(/\[strike\](.*?)\[\/strike\]/gis, '<s>$1</s>')

    // Quotes (internal newlines collapsed so the block stays on one line)
    out = out.replace(/\[quote\](.*?)\[\/quote\]/gis, (_m, inner) =>
        `<blockquote>${inner.trim().replace(/\s*\n+\s*/g, '<br />')}</blockquote>`
    )
    out = out.replace(/\[quote=(.*?)\](.*?)\[\/quote\]/gis, (_m, author, inner) =>
        `<blockquote><em>${author} wrote:</em><br>${inner.trim().replace(/\s*\n+\s*/g, '<br />')}</blockquote>`
    )

    // Links
    out = out.replace(/\[url=(.*?)\](.*?)\[\/url\]/gis, '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>')
    out = out.replace(/\[url\](.*?)\[\/url\]/gis, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')

    // Images
    out = out.replace(/\[img\](.*?)\[\/img\]/gis, '<img src="$1" loading="lazy" />')

    // Properly wrapped lists: [olist] (ordered) and [list] (unordered)
    out = out.replace(/\[olist\](.*?)\[\/olist\]/gis, (_m, inner) => convertListBlock(inner, true))
    out = out.replace(/\[list\](.*?)\[\/list\]/gis, (_m, inner) => convertListBlock(inner, false))

    // Stray [*] items with no wrapping [list]/[olist] at all — stage them as
    // <flli> markers rather than <li> directly, so the line-based grouping
    // pass in formatSteamContent (not this function) can tell them apart
    // from <li>s that are already correctly wrapped above, and group them
    // together with whichever adjacent lines are also bullets.
    out = out.replace(/\[\*\]([^\[\n]*)/gi, '<flli>$1</flli>')

    // Strip any remaining/unsupported BBCode tags
    out = out.replace(/\[\/?[a-z0-9=*_ "'#%.:,-]*\]/gi, '')

    return out
}

function sanitizeHtml(html: string): string {
    let safe = html

    // Remove script/style/iframe/object/embed blocks entirely
    safe = safe.replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
    safe = safe.replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, '')

    // Strip inline event handlers (onclick=, onerror=, etc.)
    safe = safe.replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    safe = safe.replace(/\son\w+\s*=\s*'[^']*'/gi, '')

    // Neutralize javascript: URIs in href/src
    safe = safe.replace(/(href|src)\s*=\s*"javascript:[^"]*"/gi, '$1="#"')
    safe = safe.replace(/(href|src)\s*=\s*'javascript:[^']*'/gi, "$1='#'")

    return safe
}

const BLOCK_TAG_LINE = /^\s*<(ul|ol|h1|h2|h3|h4|blockquote|img)\b/i
const STAGED_BULLET_LINE = /^\s*<flli>([\s\S]*)<\/flli>\s*$/i
const PLAIN_BULLET_LINE = /^\s*([-•*])\s+(.*)$/

export function formatSteamContent(raw: string): string {
    // Convert <br> to actual line breaks so the line-based pass below can
    // see one logical line per <br>, then run BBCode conversion.
    let text = raw.replace(/<br\s*\/?>/gi, '\n')
    text = convertBBCode(text)

    const lines = text.split('\n')
    const htmlParts: string[] = []
    let paragraphBuffer: string[] = []
    let bulletBuffer: string[] = []

    const flushParagraph = () => {
        if (paragraphBuffer.length === 0) return
        htmlParts.push(`<p>${paragraphBuffer.join('<br />')}</p>`)
        paragraphBuffer = []
    }

    const flushBullets = () => {
        if (bulletBuffer.length === 0) return
        const items = bulletBuffer.map((t) => `<li>${t}</li>`).join('')
        htmlParts.push(`<ul>${items}</ul>`)
        bulletBuffer = []
    }

    for (const rawLine of lines) {
        const line = rawLine.trim()

        if (!line) {
            flushParagraph()
            flushBullets()
            continue
        }

        if (BLOCK_TAG_LINE.test(line)) {
            flushParagraph()
            flushBullets()
            htmlParts.push(line)
            continue
        }

        const stagedMatch = line.match(STAGED_BULLET_LINE)
        if (stagedMatch) {
            flushParagraph()
            bulletBuffer.push(stagedMatch[1].trim())
            continue
        }

        const plainMatch = line.match(PLAIN_BULLET_LINE)
        if (plainMatch) {
            flushParagraph()
            bulletBuffer.push(plainMatch[2].trim())
            continue
        }

        // Plain text line
        flushBullets()
        paragraphBuffer.push(line)
    }

    flushParagraph()
    flushBullets()

    return sanitizeHtml(htmlParts.join('\n'))
}