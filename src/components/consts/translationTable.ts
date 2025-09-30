type Replacement = [RegExp, string]

type TranslationTable = Record<string, Replacement[]>

const isMissingTheFollowingPropertiesFromTypeReplacement: Replacement = [
  /is missing the following properties from type/,
  '缺少以下属性在类型',
]

const typeReplacement: Replacement = [/Type/, '类型']

const periodReplacement: Replacement = [/。/, '.']
const colonWithOneAfterSpacePropertiesReplacement: Replacement = [
  /:\s{1}/,
  '中的以下属性:',
]

export const translationTable: TranslationTable = {
  TS2307: [
    [/Cannot find module/, '找不到模块'],
    periodReplacement,
    [/or its corresponding type declarations/, '或其相应的类型声明'],
  ],
  TS2345: [
    [/Argument of type/, '类型'],
    [/is not assignable to parameter of type/, '的参数不能赋给类型'],
    [/。/g, '的参数。'],
    typeReplacement,
    [/is missing the following properties from type/, '缺少类型'],
    // <span>: <ul><li>age</li><li>email</li></ul></td>
    colonWithOneAfterSpacePropertiesReplacement,
  ],
  TS2552: [
    [/\bCannot find name\b/g, '找不到名称'],
    [/\bDid you mean\b/g, '你是否指的是'],
  ],
  TS2607: [
    [
      /\bJSX element class does not support attributes because it does not have a\b/g,
      'JSX 元素类不支持attributes，因为它不具有',
    ],
    [/\bproperty\b/g, '属性'],
  ],
  TS2739: [typeReplacement, isMissingTheFollowingPropertiesFromTypeReplacement],
  TS2741: [
    [/\bProperty\b/g, '属性'],
    [/\bis missing in type\b/g, '缺失在类型'],
    [/\bbut required in type\b/g, '但必须在类型'],
  ],
  TS2786: [
    [/\bcannot be used as a JSX component\b/g, '不能用作 JSX 组件'],
    [/\bIts type\b/g, '其类型'],
    [/\bis not a valid JSX element type\b/g, '不是有效的 JSX 元素类型'],
    [/Type:/g, '不能将类型:'],
    [/\bis not assignable to type\b/g, '分配给类型'],
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
  ],
  TS6133: [
    [/\bis declared but its value is never read\b/g, '已声明，但从未读取其值'],
  ],
}

Object.values(translationTable).forEach((replacements) => {
  replacements.unshift([/\./g, '。'])
})
