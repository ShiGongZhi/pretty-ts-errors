import { Diagnostic } from 'vscode-languageserver-types'
import { translationTable } from '../components/consts/translationTable'

export function translate(formatted: string, diagnostic: Diagnostic) {
  // console.log('%c Line:23 🥐 formatted', 'color:#b03734', formatted)
  const codeValue = diagnostic.code
  const code =
    typeof codeValue === 'number'
      ? `TS${codeValue}`
      : typeof codeValue === 'string'
      ? codeValue
      : undefined

  if (!code) {
    return formatted
  }

  const replacements = translationTable[code]
  if (!replacements) {
    return formatted
  }

  return replacements.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    formatted,
  )
}
