type Replacement = [RegExp, string]

type TranslationTable = Record<string, Replacement[]>

const typeReplacement: Replacement = [/Type/, '类型']

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

export const translationTable: TranslationTable = {
  TS2307: [
    [/Cannot find module/, '找不到模块'],
    [/or its corresponding type declarations/, '或其相应的类型声明'],
  ],
  TS2345: [
    [/Argument of type/, '类型'],
    [/is not assignable to parameter of type/, '的参数不能赋给类型'],
    [/\./, '的参数。'],
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    // <span>: <ul><li>age</li><li>email</li></ul></td>
    colonWithOneAfterSpacePropertiesReplacement,
  ],
  TS2552: [
    [/Cannot find name/, '找不到名称'],
    [/Did you mean/, '你是否指的是'],
  ],
  TS2607: [
    [
      /JSX element class does not support attributes because it does not have a/,
      'JSX 元素类不支持attributes，因为它不具有',
    ],
    propertyReplacement,
  ],
  TS2739: [
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    colonWithOneAfterSpacePropertiesReplacement,
  ],
  TS2741: [
    propertyReplacement,
    [/is missing in type/, '缺失在类型'],
    [/but required in type/, '中，但类型'],
    [/\.(?=[^.]*$)/, '中需要该属性.'],
  ],
  TS2786: [
    [/cannot be used as a JSX component/, '不能用作 JSX 组件'],
    [/Its type/, '其类型'],
    [/is not a valid JSX element type/, '不是有效的 JSX 元素类型'],
    [/Type:/, '不能将类型:'],
    [/is not assignable to type/, '分配给类型'],
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    [/:(?=[^:]*$)/, '的以下属性:'],
    [/and 3 more/, '及其他 3 项'],
  ],
  TS6133: [
    [/is declared but its value is never read/, '已声明，但从未读取其值'],
  ],
}

// 全局替换句号有问题
// Object.values(translationTable).forEach((replacements) => {
//   replacements.unshift([/\./g, '。'])
// })
