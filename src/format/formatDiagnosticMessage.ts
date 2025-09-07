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
    // Split by real HTML tags only that we actually emit (whitelist),
    // so that TS generics like `<T>` or `<Channel, string>` are treated as plain text
    // and won't be mis-parsed as HTML tags.
    // Keep this list in sync with components output (<span>, <code>, <a>, lists, etc.).
    .split(
      /(<\/?(?:span|code|pre|a|div|p|strong|em|ul|ol|li|table|thead|tbody|tr|td|th|br|hr)[^>]*>)/g
    )
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
  // Normalize Chinese quotes:
  // - Case 1: strip when they wrap a single ASCII-quoted fragment, e.g. “"..."” or “'...'”
  // - Case 2: strip when they wrap any content that itself contains ASCII quotes (e.g. unions of string literals)
  //   Example: “"blue" | "purple" | "orange" | undefined” -> "blue" | "purple" | "orange" | undefined
  const normalized = message.replace(/“\s*("[^"]+"|'[^']+')\s*”/g, '$1')
  // If the message contains CJK characters, prefer a locale-agnostic, safe formatting path
  // that focuses on highlighting quoted code fragments without relying on English words.
  // This prevents incorrect replacements on Chinese-localized diagnostics.
  const hasCJK = /[\u3400-\u9FFF\uF900-\uFAFF]/.test(normalized)

  if (hasCJK) {
    // Apply replacements only on text nodes to avoid corrupting HTML markup
    return [
      // 0) Normalize cases like “"..."” or “'...'” by removing the outer Chinese quotes
      //    so later quote-based formatters can handle the inner ASCII quotes normally.
      (msg: string) =>
        replaceTextOnly(
          msg,
          /“\s*("[^"]+"|'[^']+')\s*”/g,
          (_: string, p1: string) => p1
        ),
      // 1) Common Chinese patterns with ASCII quotes around identifiers — strip quotes
      //    e.g. 属性 "email" -> 属性 email; 类型 "User" 中 -> 类型 User 中
      (msg: string) =>
        replaceTextOnly(
          msg,
          /(属性)\s*"([A-Za-z_$][\w$]*)"/g,
          (_: string, p1: string, ident: string) =>
            `${p1} ${formatTypeBlock('', ident, format)}`
        ),
      (msg: string) =>
        replaceTextOnly(
          msg,
          /(类型)\s*"([A-Za-z_$][\w$]*)"\s*(中)/g,
          (_: string, p1: string, ident: string, p3: string) =>
            `${p1} ${formatTypeBlock('', ident, format)} ${p3}`
        ),
      // 1) Chinese full-width quotes — 类型 “...”，模块 “...”，属性 “...”。
      //    Process before ASCII quotes so unions like “"blue" | "purple" | ...”
      //    are treated as one segment.
      (msg: string) =>
        replaceTextOnly(msg, /“([^”]+)”/g, (_: string, p1: string) =>
          formatTypeBlock('', p1, format)
        ),
      // 2) ASCII double quotes — 类型 "..."
      //    Heuristic: if content looks code-like (e.g. { a: string }, A<B>, a: b, x | y),
      //    drop the quotes; otherwise keep quotes to preserve string literal semantics
      //    like "#0595FD" or "blue".
      (msg: string) => {
        // Protect existing markdown code blocks (```...```) from further replacements
        const parts = msg.split(/(```[\s\S]*?```)/g)
        return parts
          .map((seg, i) =>
            i % 2 === 1
              ? seg // inside code block — keep as is
              : replaceTextOnly(
                  seg,
                  /"([^"\n]+)"/g,
                  (_: string, p1: string) => {
                    // TypeScript built-in types should not have quotes
                    const isBuiltInType =
                      /^(void|null|undefined|any|boolean|string|number|bigint|symbol|object|never|unknown)(\[\])?$/.test(
                        p1
                      )
                    const codeLike = /[{}:;|<>()[\]]/.test(p1) || /\s/.test(p1)
                    if (isBuiltInType || codeLike) {
                      return formatTypeBlock('', p1, format)
                    }
                    // Treat as string literal: keep quotes
                    return formatTypeBlock('', `"${p1}"`, format)
                  }
                )
          )
          .join('')
      },
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
      // 4.1) Chinese suggestion: “是否要写入 xiaohongshu ?” -> highlight bare word
      (msg: string) =>
        replaceTextOnly(
          msg,
          /(是否要写入)\s*([#$\w]+)(?=[？?。]|$)/g,
          (_: string, p1: string, p2: string) =>
            `${p1} ${inlineCodeBlock(p2, 'type')}`
        ),
      // 4.2) Unknown property wording: rephrase within text-only segments
      // “中不存在类型” -> “不存在于类型” (identifier is already highlighted separately)
      (msg: string) =>
        replaceTextOnly(msg, /中不存在类型/g, () => '不存在于类型'),
      // 4.3) After rephrase, highlight the bare identifier before “不存在于类型” with type-style inline code
      (msg: string) =>
        replaceTextOnly(
          msg,
          /(但)\s*([#$\w]+)\s*(不存在于类型)/g,
          (_: string, p1: string, ident: string, p3: string) =>
            `${p1} ${inlineCodeBlock(ident, 'type')} ${p3}`
        ),
      // 4.4) Fix Chinese translations to use proper technical terms
      // Replace "类型 Form" with "typeof Form" when it should be typeof operator (TS2749)
      // This handles cases where "类型 Form" is already inside code blocks
      (msg: string) =>
        msg.replace(
          /类型\s+([A-Za-z_$][\w$]*)/g,
          (match, ident) => `typeof ${ident}`
        ),
      // Replace "未知" with "unknown" for TypeScript unknown type
      (msg: string) =>
        replaceTextOnly(msg, /["""]?未知["""]?/g, () => 'unknown'),
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
    ].reduce((acc, fn) => fn(acc), normalized)
  }

  return (
    normalized
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
      // format simple strings: "..." or “"..."”
      .replaceAll(/^["“]"([^"]*)"["”]$/g, (_: string, p1: string) =>
        formatTypeScriptBlock('', p1)
      )
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
