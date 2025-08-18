import { inlineCodeBlock, unStyledCodeBlock } from '../components'
import { formatTypeBlock } from './formatTypeBlock'

const formatTypeScriptBlock = (_: string, code: string) =>
  inlineCodeBlock(code, 'typescript')

const formatSimpleTypeBlock = (_: string, code: string) =>
  inlineCodeBlock(code, 'type')

// Replace only in text segments (outside HTML tags/attributes)
type StringReplacer = (substring: string, ...args: string[]) => string
const replaceTextOnly = (
  html: string,
  pattern: RegExp,
  replacer: StringReplacer
) =>
  html
    .split(/(<[^>]+>)/g)
    .map((seg) =>
      seg.startsWith('<')
        ? seg
        : seg.replace(pattern, (...args: unknown[]) => {
            const [substring, ...rest] = args as [string, ...string[]]
            return replacer(substring, ...rest)
          })
    )
    .join('')

export const formatDiagnosticMessage = (
  message: string,
  format: (type: string) => string
) => {
  // If the message contains CJK characters, prefer a locale-agnostic, safe formatting path
  // that focuses on highlighting quoted code fragments without relying on English words.
  // This prevents incorrect replacements on Chinese-localized diagnostics.
  const hasCJK = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(message)

  if (hasCJK) {
    // Apply replacements only on text nodes to avoid corrupting HTML markup
    return [
      // 1) ASCII double quotes — 类型 "..."
      (msg: string) =>
        replaceTextOnly(msg, /"([^"\n]+)"/g, (_: string, p1: string) =>
          formatTypeBlock('', p1, format)
        ),
      // 2) Chinese full-width quotes — 类型 “...”，模块 “...”，属性 “...”
      (msg: string) =>
        replaceTextOnly(msg, /“([^”]+)”/g, (_: string, p1: string) =>
          formatTypeBlock('', p1, format)
        ),
      // 3) Corner quotes 「…」/『…』
      (msg: string) =>
        replaceTextOnly(
          msg,
          /[「『]([^」』]+)[」』]/g,
          (_: string, p1: string) => formatTypeBlock('', p1, format)
        ),
      // 4) Chinese missing properties list: “以下属性: age, email” => <ul><li>age</li><li>email</li></ul>
      (msg: string) =>
        replaceTextOnly(
          msg,
          /(以下属性)\s*[:：]\s*([#\w]+(?:\s*[,，、]\s*[#\w]+)*)/g,
          (_: string, p1: string, p2: string) =>
            `${p1}： <ul>${p2
              .split(/[,，、]\s*/)
              .filter(Boolean)
              .map((prop: string) => `<li>${prop}</li>`)
              .join('')}</ul>`
        ),
      // 5) TS keywords
      (msg: string) =>
        replaceTextOnly(
          msg,
          /['“](import|export|require|in|continue|break|let|false|true|const|new|throw|await|for await|[0-9]+)( ?.*?)['”]/g,
          (_: string, p1: string, p2: string) =>
            formatTypeScriptBlock(_, `${p1}${p2}`)
        ),
      // 6) Fallback single quotes
      (msg: string) =>
        replaceTextOnly(
          msg,
          /'([^']+)'/g,
          (_: string, p1: string) => ` ${unStyledCodeBlock(p1)} `
        )
    ].reduce((acc, fn) => fn(acc), message)
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
