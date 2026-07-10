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

    // Resolve Steam's clan-image CDN placeholder before anything else touches it
    out = out.replace(/\{STEAM_CLAN_IMAGE\}/g, 'https://clan.cloudflare.steamstatic.com/images')

    // Headings
    out = out.replace(/\[h1\](.*?)\[\/h1\]/gis, '<h1>$1</h1>')
    out = out.replace(/\[h2\](.*?)\[\/h2\]/gis, '<h2>$1</h2>')
    out = out.replace(/\[h3\](.*?)\[\/h3\]/gis, '<h3>$1</h3>')
    out = out.replace(/\[h[4-6]\](.*?)\[\/h[4-6]\]/gis, '<h4>$1</h4>')

    // Basic inline styles
    out = out.replace(/\[p\](.*?)\[\/p\]/gis, (_m, inner) => (inner.trim() ? `<p>${inner.trim()}</p>` : ''))
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

    // Dynamic links — [dynamiclink href="URL"][/dynamiclink]. Content is always
    // empty (Steam relies on the store/social embed to render itself), so we
    // generate the display ourselves. YouTube hrefs get the same thumbnail
    // preview as [previewyoutube]; everything else becomes a plain link card.
    out = out.replace(
        /\[dynamiclink\s+href\s*=\s*(?:"|&quot;)([^"]*?)(?:"|&quot;)\]\s*\[\/dynamiclink\]/gis,
        (_m, hrefRaw) => {
            const href = hrefRaw.trim()
            const ytMatch = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i)
            if (ytMatch) {
                const videoId = ytMatch[1]
                return `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="yt-preview">` +
                    `<img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" loading="lazy" alt="YouTube video preview" ` +
                    `onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'" />` +
                    `</a>`
            }
            return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="dynamic-link">${href}</a>`
        }
    )

    // Links
    // Links — supports [url=URL]...[/url] and [url="URL"]...[/url] (Steam uses both)
    out = out.replace(/\[url=(.*?)\](.*?)\[\/url\]/gis, (_m, url, label) => {
        const cleanUrl = url.trim().replace(/^["']|["']$/, '').replace(/["']$/, '')
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`
    })
    out = out.replace(/\[url\](.*?)\[\/url\]/gis, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')

    // Images
    out = out.replace(/\[img(?:\s+src\s*=\s*(?:"|&quot;)([^"]*?)(?:"|&quot;)|\s+src\s*=\s*'([^']*?)')?\](.*?)\[\/img\]/gis,
        (_m, dq, sq, inner) => {
            const src = (dq ?? sq ?? inner ?? '').trim()
            return src ? `<img src="${src}" loading="lazy" />` : ''
        }
    )

    out = out.replace(/\[previewyoutube=(?:"|&quot;)?([\w-]+)(?:;[^"\]]*)?(?:"|&quot;)?\]([\s\S]*?)\[\/previewyoutube\]/gi,
        (_m, videoId) =>
            `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="yt-preview">` +
            `<img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" loading="lazy" alt="YouTube video preview" ` +
            `onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'" />` +
            `</a>`
    )

    // Tables — [table equalcells="1" colwidth=",,,,"][tr][td]...[/td][/tr][/table]
    // Attributes (equalcells, colwidth) are layout hints from Steam's editor;
    // we drop them and let CSS handle table styling.
    out = out.replace(/\[table[^\]]*\]/gi, '<table>')
    out = out.replace(/\[\/table\]/gi, '</table>')
    out = out.replace(/\[tr\]/gi, '<tr>')
    out = out.replace(/\[\/tr\]/gi, '</tr>')
    out = out.replace(/\[td\]/gi, '<td>')
    out = out.replace(/\[\/td\]/gi, '</td>')

    // Youtube links
    out = out.replace(/\[previewyoutube=(?:"|&quot;)?([\w-]+)(?:;[^"\]]*)?(?:"|&quot;)?\]([\s\S]*?)\[\/previewyoutube\]/gi,
        (_m, videoId) =>
            `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="yt-preview">` +
            `<img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" loading="lazy" alt="YouTube video preview" />` +
            `</a>`
    )

    // Properly wrapped lists: [olist] (ordered) and [list] (unordered)
    // Properly wrapped lists: [olist] (ordered) and [list] (unordered).
    // Steam nests [list] inside [*] items (e.g. "Wares Added:" / "Wares Changed:"
    // sub-groups under a single top-level bullet). A single non-greedy regex pass
    // can't handle that nesting — it just grabs from the first [list] to the
    // nearest [/list], regardless of depth, which flattens/misaligns everything
    // after the first nested block. So we resolve innermost lists first (via a
    // negative lookahead that only matches a [list]/[olist] block containing no
    // further list tags), then repeat until nothing changes.
    function convertLists(text: string): string {
        let prev: string
        const innerPattern = '((?:(?!\\[\\/?list\\]|\\[\\/?olist\\]).)*)'
        const olistRe = new RegExp(`\\[olist\\]${innerPattern}\\[\\/olist\\]`, 'gis')
        const listRe = new RegExp(`\\[list\\]${innerPattern}\\[\\/list\\]`, 'gis')
        do {
            prev = text
            text = text.replace(olistRe, (_m, inner) => convertListBlock(inner, true))
            text = text.replace(listRe, (_m, inner) => convertListBlock(inner, false))
        } while (text !== prev)
        return text
    }

    out = convertLists(out)

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

const BLOCK_TAG_LINE = /^\s*<(ul|ol|h1|h2|h3|h4|blockquote|img|table)\b/i
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