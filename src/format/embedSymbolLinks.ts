import { Diagnostic } from 'vscode-languageserver-types'
import { URI } from 'vscode-uri'

export function embedSymbolLinks(diagnostic: Diagnostic): Diagnostic {
  const related = diagnostic?.relatedInformation ?? []
  if (!related.length) {
    return diagnostic
  }

  // Recognize localized "is declared here" messages (English + Chinese variants)
  const declaredHerePattern = /(?:is declared here|在此.*声明)/i
  // Capture symbols wrapped in various quote styles: '…' "…" “…” 「…」 『…』
  const symbolQuote = /(['"“「『].*?['"”」』])/

  for (const ref of related) {
    const msg = ref?.message ?? ''
    if (!declaredHerePattern.test(msg)) {
      continue
    }
    const match = msg.match(symbolQuote)
    const symbol = match?.[1]
    if (!symbol) {
      continue
    }

    const href = `${URI.parse(ref.location.uri).fsPath}#${
      ref.location.range.start.line + 1
    },${ref.location.range.start.character + 1}`

    return {
      ...diagnostic,
      message: diagnostic.message.replaceAll(
        symbol,
        `${symbol} <a href="${href}"><span class="codicon codicon-go-to-file" ></span></a>&nbsp;`
      )
    }
  }

  return diagnostic
}
