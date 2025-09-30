type Replacement = [RegExp, string]

type TranslationTable = Record<string, Replacement[]>

export const translationTable: TranslationTable = {
  TS2345: [
    [/\bArgument of type\b/g, '类型'],
    [/\bis not assignable to parameter of type\b/g, '的参数不能赋给类型'],
    [/\./g, '的参数。'],
    [/\bType\b/g, '类型'],
    [
      /\bis missing the following properties from type\b/g,
      '缺少以下属性在类型',
    ],
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
    [/\bType\b/g, '类型'],
    [
      /\bis missing the following properties from type\b/g,
      '缺少以下属性在类型',
    ],
  ],
  TS6133: [
    [/\bis declared but its value is never read\b/g, '已声明，但从未读取其值'],
  ],
}

Object.values(translationTable).forEach((replacements) => {
  replacements.push([/\./g, '。'])
})
