type Replacement = [RegExp, string]

type TranslationTable = Record<string, Replacement[]>

const typeReplacement: Replacement = [/Type/, '类型']
const andReplacement: Replacement = [/and/, '和']
const typeWithSpaceReplacement: Replacement = [/ type/, ' 类型']
const typeWithColonReplacement: Replacement = [/Type:/g, '不能将类型:']
const typeExactMatchReplacement: Replacement = [/\bType\b/g, '不能将类型']

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

const lastPeriodRegExp = /\.(?=[^.]*$)/
const lastTypeRegExp = /type(?=[^type]*$)/

export const translationTable: TranslationTable = {
  TS1155: [
    [/</, '必须初始化<'],
    [/declarations must be initialized./, '声明'],
  ],
  TS1507: [[/There is nothing available for repetition/, '没有可重复的内容']],
  TS2304: [[/Cannot find name/, '找不到名称']],
  TS2307: [
    [/Cannot find module/, '找不到模块'],
    [/or its corresponding type declarations/, '或其相应的类型声明'],
  ],
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
  TS2339: [propertyReplacement, doesNotExistOnTypeReplacement],
  TS2345: [
    [/Argument of type/, '类型'],
    [/is not assignable to parameter of type/, '的参数不能赋给类型'],
    [/\./, '的参数。'],
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
    [lastPeriodRegExp, '中.'],
  ],
  TS2451: [
    [/Cannot redeclare block-scoped variable/, '无法重新声明块范围变量'],
  ],
  TS2552: [
    [/Cannot find name/, '找不到名称'],
    [/Did you mean/, '你是否指的是'],
  ],
  TS2561: [
    [
      /Object literal may only specify known properties, but/,
      '对象字面量只能指定已知属性，但',
    ],
    doesNotExistInTypeReplacement,
    [lastPeriodRegExp, '中.'],
    [/Did you mean to write/, '是否要写入'],
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
    [lastPeriodRegExp, '中需要该属性.'],
  ],
  TS2749: [
    [
      /refers to a value, but is being used as a type here. Did you mean/,
      '表示值，但在此处用作类型。是否指',
    ],
  ],
  TS2786: [
    [/cannot be used as a JSX component/, '不能用作 JSX 组件'],
    [/Its type/, '其类型'],
    [/is not a valid JSX element type/, '不是有效的 JSX 元素类型'],
    typeWithColonReplacement,
    isNotAssignableToTypeReplacement,
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    [/:(?=[^:]*$)/, '的以下属性:'],
    [/and 3 more/, '及其他 3 项'],
  ],
  TS6133: [
    [/<code>/, '已声明<code>'],
    [/is declared but its value is never read/, '，但从未读取其值'],
  ],
  TS6198: [
    [/All destructured elements are unused/, '所有解构出的成员都未使用'],
  ],
  TS7005: [
    [/Variable/, '变量'],
    implicitlyHasAnReplacement,
    [lastTypeRegExp, '类型'],
  ],
  TS7006: [
    [/Parameter/, '参数'],
    implicitlyHasAnReplacement,
    [lastTypeRegExp, '类型'],
  ],
  TS7031: [
    [/Binding element/, '绑定元素'],
    implicitlyHasAnReplacement,
    [lastTypeRegExp, '类型'],
  ],
  TS7051: [
    [
      /Parameter has a name but no type. Did you mean/,
      '参数具有名称，但不具有类型。你是想使用',
    ],
    [/\?/, '吗?'],
  ],
  TS7053: [
    [/Element implicitly has an/, '元素隐式具有'],
    typeWithSpaceReplacement,
    [/because expression of type/, '，因为类型为'],
    [/can't be used to index type/, '的表达式不能用于索引类型'],
    [/No index signature with a parameter of type/, '找不到具有类型为'],
    [/was found on type/, '的参数的索引签名在类型'],
    [lastPeriodRegExp, '上.'],
  ],
  TS18004: [
    [
      /Either declare one or provide an initializer/,
      '请声明一个值或提供一个初始值设定项',
    ],
  ],
  TS18046: [[/is of type/, '的类型为']],
  TS18048: [[/is possibly/, '可能为']],
}

// 全局替换句号有问题
// Object.values(translationTable).forEach((replacements) => {
//   replacements.unshift([/\./g, '。'])
// })
