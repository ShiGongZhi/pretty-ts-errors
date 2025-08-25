import * as assert from 'assert'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import { inlineCodeBlock } from '../../components'
import { addMissingParentheses } from '../../format/addMissingParentheses'
import { formatDiagnosticMessage } from '../../format/formatDiagnosticMessage'
import { prettifyType } from '../../format/formatTypeBlock'
import { prettify } from '../../format/prettify'
import { d } from '../../utils'
import { embedSymbolLinks } from '../../format/embedSymbolLinks'
import { Diagnostic } from 'vscode-languageserver-types'
import {
  errorWithDashInObjectKeys,
  errorWithSpecialCharsInObjectKeys,
  zh_cn_ts2307Error,
  zh_cn_ts2322Error,
  zh_cn_ts2304Error,
  zh_cn_ts2339Error,
  zh_cn_ts2345Error,
  zh_cn_ts2339Error_cornerQuotes,
  zh_cn_ts2741Error,
  zh_cn_ts2345_setStateAction,
  zh_cn_ts2741_Record_Channel
} from './errorMessageMocks'

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')

  test('Test of adding missing parentheses', () => {
    assert.strictEqual(
      addMissingParentheses('Hello, {world! [This] is a (test.'),
      'Hello, {world! [This] is a (test.\n...)}'
    )
  })

  test('Special characters in object keys', () => {
    assert.strictEqual(
      formatDiagnosticMessage(errorWithSpecialCharsInObjectKeys, prettify),
      'Type ' +
        inlineCodeBlock('string', 'type') +
        ' is not assignable to type ' +
        inlineCodeBlock(`{ "abc*bc": string }`, 'type') +
        '.'
    )
  })

  test("Special method's word in the error", () => {
    assert.strictEqual(
      formatDiagnosticMessage(errorWithDashInObjectKeys, prettify),
      'Type ' +
        inlineCodeBlock(`{ person: { "first-name": string } }`, 'type') +
        ' is not assignable to type ' +
        inlineCodeBlock('string', 'type') +
        '.'
    )
  })

  test('Formatting type with params destructuring should succeed', () => {
    prettifyType(
      d` { $ref: null; ref: (ref: any) => any; columns: ({ label: string; prop: string; } | { label: string; formatter: ({ ip_type }: any) => any; } | { actions: { label: string; disabled: ({ contract_id }: any) => boolean; handler({ contract_id }: any): void; }[]; })[]; ... 4 more ...; load(): Promise<...>; }
    `,
      prettify,
      { throwOnError: true }
    )
  })

  test('Formatting truncated type should succeed', () => {
    prettifyType(
      d` { b: { name: string; icon: undefined; }; c: { name: string; icon: undefined; }; d: { name: string; icon: undefined; }; e: { name: string; icon: undefined; }; f: { ...; }; g: { ...; }; h:...`,
      prettify,
      { throwOnError: true }
    )
  })

  test('Chinese: cannot find module should highlight quoted part', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2307Error, prettify)
    // It should include a formatted type/code block for the quoted module name
    assert.match(out, /events/)
  })

  test('Chinese: type not assignable should format both sides', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2322Error, prettify)
    // Both "string" and "number" should appear, formatted as code
    assert.match(out, /string/)
    assert.match(out, /number/)
  })

  test('Chinese: cannot find name should highlight symbol', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2304Error, prettify)
    assert.match(out, /varname/)
  })

  test('Chinese: property does not exist on type should highlight type and property', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2339Error, prettify)
    assert.match(out, /User/)
    assert.match(out, /age/)
  })

  test('Chinese: argument of type X is not assignable to parameter of type Y', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2345Error, prettify)
    assert.match(out, /string/)
    assert.match(out, /number/)
  })

  test('Chinese: corner quotes should be recognized', () => {
    const out = formatDiagnosticMessage(
      zh_cn_ts2339Error_cornerQuotes,
      prettify
    )
    assert.match(out, /User/)
    assert.match(out, /age/)
  })

  test('Chinese: TS2741 missing property message should highlight quoted segments', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2741Error, prettify)
    // Should include object type, property name, and target type
    assert.match(out, /\{\s*name:\s*string;?\s*age:\s*number;?\s*\}/)
    assert.match(out, /email/)
    assert.match(out, /User/)
  })

  test('Chinese: SetStateAction<{}> should be preserved and highlighted', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2345_setStateAction, prettify)
    // We only assert the string exists; the hover output includes HTML wrappers
    assert.match(out, /SetStateAction<\{\}>/)
  })

  test('Chinese: Record<Channel, string> should be preserved and highlighted', () => {
    const out = formatDiagnosticMessage(zh_cn_ts2741_Record_Channel, prettify)
    assert.match(out, /Record<Channel, string>/)
  })

  test('Chinese: strip outer Chinese quotes around ASCII quoted text (“"..."”)', () => {
    const out = formatDiagnosticMessage('“"./config.tsx"”', prettify)
    // No Chinese quotes should remain around the formatted content
    assert.ok(!/“|”/.test(out))
    // The inner content should still be present/formatted
    assert.match(out, /config\.tsx/)
  })

  test('Symbol links: should not inject anchor into property keys inside code blocks', () => {
    const original: Diagnostic = {
      message:
        '类型 "{ type: string; age: number; }" 的参数不能赋给类型 "{ type: number; }"。',
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 1 }
      },
      relatedInformation: [
        {
          message: '“type” 在此声明',
          location: {
            uri: 'file:///tmp/a.ts',
            range: {
              start: { line: 0, character: 0 },
              end: { line: 0, character: 4 }
            }
          }
        }
      ]
    }

    const out = embedSymbolLinks(original)
    // Should not add codicon inside the code block around "type: string" or "type: number"
    assert.ok(!out.message.includes('codicon'))
    assert.ok(out.message.includes('{ type: string; age: number; }'))
  })
})
