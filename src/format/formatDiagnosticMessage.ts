import { inlineCodeBlock, unStyledCodeBlock } from '../components'
import { formatTypeBlock } from './formatTypeBlock'

const formatTypeScriptBlock = (_: string, code: string) =>
  inlineCodeBlock(code, 'typescript')

const formatSimpleTypeBlock = (_: string, code: string) =>
  inlineCodeBlock(code, 'type')

export const formatDiagnosticMessage = (
  message: string,
  format: (type: string) => string
) => {
  // If the message contains CJK characters, prefer a locale-agnostic, safe formatting path
  // that focuses on highlighting quoted code fragments without relying on English words.
  // This prevents incorrect replacements on Chinese-localized diagnostics.
  const hasCJK = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(message)

  if (hasCJK) {
    return (
      message
        // Highlight content within Chinese/Asian full-width quotes first
        // e.g., 找不到模块“axios” 或 不能将类型“X”分配给类型“Y”
        .replaceAll(/“([^”]+)”/g, (_: string, p1: string) =>
          formatTypeBlock('', p1, format)
        )
        // Support Japanese/Traditional style corner quotes too: 「…」/『…』
        .replaceAll(/[「『]([^」』]+)[」』]/g, (_: string, p1: string) =>
          formatTypeBlock('', p1, format)
        )
        // Keep TypeScript keywords formatting inside any quotes (works for localized sentences)
        .replaceAll(
          /['“](import|export|require|in|continue|break|let|false|true|const|new|throw|await|for await|[0-9]+)( ?.*?)['”]/g,
          (_: string, p1: string, p2: string) =>
            formatTypeScriptBlock(_, `${p1}${p2}`)
        )
        // Fallback: simple single-quoted code spans
        .replaceAll(
          /'([^']+)'/g,
          (_: string, p1: string) => ` ${unStyledCodeBlock(p1)} `
        )
    )
  }

  return (
    message
      .replaceAll(/(?:\s)'"(.*?)(?<!\\)"'(?:\s|:|.|$)/g, (_, p1: string) =>
        formatTypeBlock('', `"${p1}"`, format)
      )
      // format declare module snippet
      .replaceAll(
        /['“](declare module )['”](.*)['“];['”]/g,
        (_: string, p1: string, p2: string) =>
          formatTypeScriptBlock(_, `${p1} "${p2}"`)
      )
      // format missing props error
      .replaceAll(
        /(is missing the following properties from type\s?)'(.*)': ((?:#?\w+, )*(?:(?!and)\w+)?)/g,
        (_, pre, type, post) =>
          `${pre}${formatTypeBlock('', type, format)}: <ul>${post
            .split(', ')
            .filter(Boolean)
            .map((prop: string) => `<li>${prop}</li>`)
            .join('')}</ul>`
      )
      // Format type pairs
      .replaceAll(
        /(types) ['“](.*?)['”] and ['“](.*?)['”][.]?/gi,
        (_: string, p1: string, p2: string, p3: string) =>
          `${formatTypeBlock(p1, p2, format)} and ${formatTypeBlock(
            '',
            p3,
            format
          )}`
      )
      // Format type annotation options
      .replaceAll(
        /type annotation must be ['“](.*?)['”] or ['“](.*?)['”][.]?/gi,
        (_: string, p1: string, p2: string, p3: string) =>
          `${formatTypeBlock(p1, p2, format)} or ${formatTypeBlock(
            '',
            p3,
            format
          )}`
      )
      .replaceAll(
        /(Overload \d of \d), ['“](.*?)['”], /gi,
        (_, p1: string, p2: string) => `${p1}${formatTypeBlock('', p2, format)}`
      )
      // format simple strings
      .replaceAll(/^["“]"[^"]*"["”]$/g, formatTypeScriptBlock)
      // Replace module 'x' by module "x" for ts error #2307
      .replaceAll(
        /(module )'([^"]*?)'/gi,
        (_, p1: string, p2: string) => `${p1}"${p2}"`
      )
      // Format string types
      .replaceAll(
        /(module|file|file name|imported via) ['"“](.*?)['"“](?=[\s(.|,]|$)/gi,
        (_, p1: string, p2: string) => formatTypeBlock(p1, `"${p2}"`, format)
      )
      // Format types
      .replaceAll(
        /(type|type alias|interface|module|file|file name|class|method's|subtype of constraint) ['“](.*?)['“](?=[\s(.|,)]|$)/gi,
        (_, p1: string, p2: string) => formatTypeBlock(p1, p2, format)
      )
      // Format reversed types
      .replaceAll(
        /(.*)['“]([^>]*)['”] (type|interface|return type|file|module|is (not )?assignable)/gi,
        (_: string, p1: string, p2: string, p3: string) =>
          `${p1}${formatTypeBlock('', p2, format)} ${p3}`
      )
      // Format simple types that didn't captured before
      .replaceAll(
        /['“]((void|null|undefined|any|boolean|string|number|bigint|symbol)(\[\])?)['”]/g,
        formatSimpleTypeBlock
      )
      // Format some typescript key words
      .replaceAll(
        /['“](import|export|require|in|continue|break|let|false|true|const|new|throw|await|for await|[0-9]+)( ?.*?)['”]/g,
        (_: string, p1: string, p2: string) =>
          formatTypeScriptBlock(_, `${p1}${p2}`)
      )
      // Format return values
      .replaceAll(
        /(return|operator) ['“](.*?)['”]/gi,
        (_, p1: string, p2: string) => `${p1} ${formatTypeScriptBlock('', p2)}`
      )
      // Format regular code blocks
      .replaceAll(
        /(?<!\w)'((?:(?!["]).)*?)'(?!\w)/g,
        (_: string, p1: string) => ` ${unStyledCodeBlock(p1)} `
      )
  )
}
