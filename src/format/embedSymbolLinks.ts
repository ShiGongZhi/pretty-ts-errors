import { Diagnostic } from 'vscode-languageserver-types'
import { URI } from 'vscode-uri'

export function embedSymbolLinks(diagnostic: Diagnostic): Diagnostic {
  const related = diagnostic?.relatedInformation ?? []
  if (!related.length) {
    return diagnostic
  }

  // Recognize localized "is/was declared here" messages (English + Chinese variants)
  // - English: "is declared here" or "was declared here"
  // - Chinese: common forms like "在此声明"、"在此处声明"、"在这里声明"、以及部分情境下的 "在此定义"
  const declaredHerePattern =
    /(?:(?:is|was)\s+declared\s+here|在此(?:处)?(?:.*)?(?:声明|定义)|在这里.*(?:声明|定义))/i
  // Capture symbols wrapped in various quote styles: '…' "…" “…” 「…」 『…』
  const symbolQuote = /(['"“「『].*?['"”」』])/

  for (const ref of related) {
    const msg = ref?.message ?? ''
    if (!declaredHerePattern.test(msg)) {
      continue
    }
    // Try to capture quoted symbol first
    const match = msg.match(symbolQuote)
    let symbol = match?.[1]
    // Fallbacks when the localized message doesn't include quotes
    if (!symbol) {
      // EN: <id> is/was declared here
      const en = msg.match(/([A-Za-z_$][\w$]*)\s+(?:is|was)\s+declared\s+here/i)
      // ZH: 在此(处)?(……)?(声明|定义) <id>
      const zh = msg.match(
        /在此(?:处)?(?:.*)?(?:声明|定义)[：:，,\s]*([A-Za-z_$][\w$]*)/i
      )
      const id = en?.[1] ?? zh?.[1]
      if (!id) {
        continue
      }
      symbol = id
    }

    const href = `${URI.parse(ref.location.uri).fsPath}#${
      ref.location.range.start.line + 1
    },${ref.location.range.start.character + 1}`

    // Build a safe pattern to match the symbol in the main diagnostic message, with or without quotes
    const plainSymbol = symbol
      .replace(/^['"“「『]/, '')
      .replace(/['"”」』]$/, '')

    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(
      `(?<![\\w$])(['"“「『]?)(?:${escapeRegExp(
        plainSymbol
      )})(['"”」』]?)(?![\\w$])`,
      'g'
    )

    return {
      ...diagnostic,
      message: diagnostic.message.replace(
        pattern,
        (m) =>
          `${m} <a href="${href}"><span class="codicon codicon-go-to-file"></span></a>&nbsp;`
      )
    }
  }

  return diagnostic
}
