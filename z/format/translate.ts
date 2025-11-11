type Replacement = [RegExp, string]

type TranslationTable = Record<string, Replacement[]>

const typeReplacement: Replacement = [/Type/, '类型']
const andReplacement: Replacement = [/and/, '和']
const typeWithSpaceReplacement: Replacement = [/ type/, ' 类型']
const typeWithColonReplacement: Replacement = [/Type:/g, '不能将类型:']
const typeExactMatchReplacement: Replacement = [/\bType\b/g, '不能将类型']

const isPossiblyReplacement: Replacement = [/is possibly/, '可能为']

const didYouMeanReplacement: Replacement = [/Did you mean/, '你是否指的是']

const doesNotExistOnTypeReplacement: Replacement = [
  /does not exist on type/,
  '不存在于类型',
]

const implicitlyHasAnReplacement: Replacement = [
  /implicitly has an/,
  '隐式具有',
]

const isNotAssignableToTypeReplacement: Replacement = [
  /is not assignable to type/g,
  '分配给类型',
]

const areIncompatibleReplacement: Replacement = [
  /are incompatible/g,
  '的类型不兼容',
]

const doesNotExistInTypeReplacement: Replacement = [
  /does not exist in type/,
  '不在类型',
]

// const isMissingTheFollowingPropertiesFromTypeReplacement: Replacement = [
//   /is missing the following properties from type/,
//   '缺少以下属性在类型',
// ]
const isMissingTheFollowingPropertiesFromTypeReplacement: Replacement = [
  /is missing the following properties from type/,
  '缺少类型',
]

const colonWithOneAfterSpacePropertiesReplacement: Replacement = [
  /:\s{1}/,
  '中的以下属性:',
]

const propertyReplacement: Replacement = [/property|Property/, '属性']

const periodReplace = '。'

const firstPeriodRegExp = /\./
const firstPeriodReplacement: Replacement = [firstPeriodRegExp, periodReplace]
const allPeriodReplacement: Replacement = [/\./g, periodReplace]
const allPeriodReplacementEmptyString: Replacement = [/\./g, '']

const lastPeriodRegExp = /\.(?=[^.]*$)/
const lastPeriodReplacement: Replacement = [lastPeriodRegExp, periodReplace]
const lastPeriodReplacementEmptyString: Replacement = [lastPeriodRegExp, '']

const lastTypeRegExp = /type(?=[^type]*$)/
const lastTypeReplacement: Replacement = [lastTypeRegExp, '类型']

const htmlStartRegExp = /</

const translationTable: TranslationTable = {
  TS1005: [
    [htmlStartRegExp, '应为<'],
    [/expected/, ''],
    lastPeriodReplacementEmptyString,
  ],
  TS1109: [[/Expression expected/, '应为表达式'], lastPeriodReplacement],
  TS1117: [
    [
      /An object literal cannot have multiple properties with the same name/,
      '对象文本不能具有多个名称相同的属性',
    ],
    lastPeriodReplacement,
  ],
  TS1127: [[/Invalid character/, '无效的字符'], lastPeriodReplacement],
  TS1155: [
    [htmlStartRegExp, '必须初始化<'],
    [/declarations must be initialized/, '声明'],
    lastPeriodReplacement,
  ],
  TS1161: [
    [/Unterminated regular expression literal/, '未终止的正则表达式字面量'],
    lastPeriodReplacement,
  ],
  TS1359: [
    [/Identifier expected/, '应为标识符'],
    [/is a reserved word that cannot be used here/, '是保留字，不能在此处使用'],
    allPeriodReplacement,
  ],
  TS1381: [
    [/Unexpected token. Did you mean/, '意外的标记。你是想使用'],
    [/or/, '还是'],
  ],
  TS1507: [
    [/There is nothing available for repetition/, '没有可重复的内容'],
    lastPeriodReplacement,
  ],
  TS2300: [
    [/Duplicate identifier/, '标识符'],
    [lastPeriodRegExp, '重复' + periodReplace],
  ],
  TS2304: [
    [/Cannot find name/, '找不到名称'],
    lastPeriodReplacementEmptyString,
  ],
  TS2307: [
    [/Cannot find module/, '找不到模块'],
    [/or its corresponding type declarations/, '或其相应的类型声明'],
    lastPeriodReplacement,
  ],
  TS2314: [
    [/Generic type/, '泛型类型'],
    [/requires/, '需要'],
    [/type argument\(s\)/, '个类型参数'],
    lastPeriodReplacement,
  ],
  // 翻译格式不对
  // 太复杂，不处理英文句号
  // 未翻译【Source has 4 element(s) but target allows only 2】
  TS2322: [
    typeExactMatchReplacement,
    isNotAssignableToTypeReplacement,
    [/Types of property/, '属性'],
    areIncompatibleReplacement,
    [/Types of parameters/, '参数'],
    andReplacement,
    propertyReplacement,
    doesNotExistOnTypeReplacement,
  ],
  // 翻译格式不对
  TS2339: [
    propertyReplacement,
    doesNotExistOnTypeReplacement,
    lastPeriodReplacementEmptyString,
  ],
  TS2345: [
    [/Argument of type/, '类型'],
    [/is not assignable to parameter of type/, '的参数不能赋给类型'],
    [firstPeriodRegExp, '的参数' + periodReplace],
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    // <span>: <ul><li>age</li><li>email</li></ul></td>
    colonWithOneAfterSpacePropertiesReplacement,
  ],
  TS2353: [
    [
      /Object literal may only specify known properties, and/,
      '对象字面量只能指定已知属性，并且',
    ],
    doesNotExistInTypeReplacement,
    [lastPeriodRegExp, '中' + periodReplace],
  ],
  TS2371: [
    [
      /A parameter initializer is only allowed in a function or constructor implementation/,
      '只允许在函数或构造函数实现中使用参数初始化表达式',
    ],
    lastPeriodReplacement,
  ],
  // 原版翻译优化
  TS2448: [
    [/Block-scoped variable/, '块范围变量'],
    [/used before its declaration/, '在声明之前就已使用'],
    lastPeriodReplacement,
  ],
  TS2451: [
    [/Cannot redeclare block-scoped variable/, '无法重新声明块范围变量'],
    lastPeriodReplacementEmptyString,
  ],
  TS2454: [
    [/Variable/, '在赋值前使用了变量'],
    [/is used before being assigned/, ''],
    lastPeriodReplacement,
  ],
  TS2551: [
    propertyReplacement,
    doesNotExistOnTypeReplacement,
    didYouMeanReplacement,
    firstPeriodReplacement,
  ],
  TS2552: [
    [/Cannot find name/, '找不到名称'],
    firstPeriodReplacement,
    didYouMeanReplacement,
  ],
  TS2554: [
    [/Expected/, '应有'],
    [/arguments, but got/, '个参数，但获得'],
    [lastPeriodRegExp, ' 个' + periodReplace],
  ],
  TS2561: [
    [
      /Object literal may only specify known properties, but/,
      '对象字面量只能指定已知属性，但',
    ],
    doesNotExistInTypeReplacement,
    [lastPeriodRegExp, '中' + periodReplace],
    [/Did you mean to write/, '是否要写入'],
  ],
  TS2607: [
    [
      /JSX element class does not support attributes because it does not have a/,
      'JSX 元素类不支持attributes，因为它不具有',
    ],
    propertyReplacement,
    lastPeriodReplacement,
  ],
  TS2693: [
    [
      /only refers to a type, but is being used as a value here/,
      '仅表示类型，但在此处却作为值使用',
    ],
    lastPeriodReplacement,
  ],
  TS2695: [
    [
      /Left side of comma operator is unused and has no side effects/,
      '逗号运算符的左侧未使用，没有任何副作用',
    ],
    lastPeriodReplacement,
  ],
  TS2739: [
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    colonWithOneAfterSpacePropertiesReplacement,
  ],
  // 翻译格式不对
  TS2741: [
    propertyReplacement,
    [/is missing in type/, '缺失在类型'],
    [/but required in type/, '中，但类型'],
    [lastPeriodRegExp, '中需要该属性' + periodReplace],
  ],
  TS2749: [
    [
      /refers to a value, but is being used as a type here. Did you mean/,
      '表示值，但在此处用作类型。是否指',
    ],
  ],
  TS2769: [
    [/No overload matches this call/, '没有与此调用匹配的重载'],
    [/Overload/g, '重载'],
    [/gave the following error/g, '出现以下错误'],
    allPeriodReplacementEmptyString,
  ],
  // 句号未全部翻译
  TS2786: [
    [/cannot be used as a JSX component./, '不能用作 JSX 组件' + periodReplace],
    [/Its type/, '其类型'],
    [
      /is not a valid JSX element type./,
      '不是有效的 JSX 元素类型' + periodReplace,
    ],
    typeWithColonReplacement,
    isNotAssignableToTypeReplacement,
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    [/:(?=[^:]*$)/, '的以下属性:'],
    [/and 3 more./, '及其他 3 项' + periodReplace],
  ],
  TS6133: [
    [htmlStartRegExp, '已声明 <'],
    [/\s*is declared but its value is never read/, '，但从未读取其值'],
    lastPeriodReplacement,
  ],
  TS6198: [
    [/All destructured elements are unused/, '所有解构出的成员都未使用'],
    lastPeriodReplacement,
  ],
  TS7005: [
    [/Variable/, '变量'],
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  TS7006: [
    [/Parameter/, '参数'],
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  TS7022: [
    [/implicitly has type/, '隐式具有类型'],
    [
      /because it does not have a type annotation and is referenced directly or indirectly in its own initializer/,
      '，因为它不具有类型批注，且在其自身的初始化表达式中得到直接或间接引用',
    ],
    lastPeriodReplacement,
  ],
  TS7031: [
    [/Binding element/, '绑定元素'],
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  TS7051: [
    [
      /Parameter has a name but no type. Did you mean/,
      '参数具有名称，但不具有类型。你是想使用',
    ],
    [/\?/, '吗?'],
  ],
  // 翻译格式不对 （找不到具有类型为）
  TS7053: [
    [/Element implicitly has an/, '元素隐式具有'],
    typeWithSpaceReplacement,
    [/because expression of type/, '，因为类型为'],
    [/can't be used to index type/, '的表达式不能用于索引类型'],
    [/No index signature with a parameter of type/, '找不到具有类型为'],
    [/was found on type/, '的参数的索引签名在类型'],
    allPeriodReplacementEmptyString,
  ],
  // 未全部翻译 （找不到简写属性）
  TS18004: [
    [
      /Either declare one or provide an initializer/,
      '请声明一个值或提供一个初始值设定项',
    ],
    allPeriodReplacement,
  ],
  // obj 可能为 unknown
  TS18046: [[/is of type/, '的类型为'], lastPeriodReplacementEmptyString],
  // obj 可能为 null
  TS18047: [isPossiblyReplacement, lastPeriodReplacementEmptyString],
  // obj 可能为 undefined
  TS18048: [isPossiblyReplacement, lastPeriodReplacementEmptyString],
}

// 全局替换句号有问题
// Object.values(translationTable).forEach((replacements) => {
//   replacements.unshift([/\./g, '。'])
// })

import { Diagnostic } from 'vscode-languageserver-types'

export function translate(formatted: string, diagnostic: Diagnostic) {
  // console.log('%c Line:23 🥐 formatted', 'color:#b03734', formatted)
  // "prettier.trailingComma": "none",
  // "prettier.singleQuote": false,
  // "prettier.semi": true,

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
