type Replacement = [RegExp, string]

type TranslationTable = Record<string, Replacement[]>

const variableReplacement: Replacement = [/Variable/, '变量']
const parameterReplacement: Replacement = [/Parameter/, '参数']
const memberReplacement: Replacement = [/Member/, '成员']
const propertyReplacement: Replacement = [/property|Property/, '属性']
const moduleReplacement: Replacement = [/Module/, '模块']
const typeReplacement: Replacement = [/Type/, '类型']
const typeWithSpaceReplacement: Replacement = [/ type /, ' 类型']
const typeWithColonReplacement: Replacement = [/Type:/g, '不能将类型:']
const andReplacement: Replacement = [/and/, '和']
const questionMarkReplacement: Replacement = [/\?/, '吗?']

const hasNoExportedMemberReplacement: Replacement = [
  /has no exported member/,
  '没有导出的成员',
]

const cannotFindNameReplacement: Replacement = [
  /Cannot find name/,
  '找不到名称',
]

const isPossiblyReplacement: Replacement = [/is possibly/, '可能为']

const didYouMeanReplacement: Replacement = [/\. Did you mean/, '。你是否指的是']

const doesNotExistReplace = '不存在于类型'

const doesNotExistOnTypeReplacement: Replacement = [
  /does not exist on type/,
  doesNotExistReplace,
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
  /<span>:\s*/,
  '<span>中的以下属性:',
]

const isNotAssignableToTypeReplacement: Replacement = [
  /is not assignable to type/g,
  '分配给类型',
]

const inferredFromUsageReplacement: Replacement = [
  /type, but a better type may be inferred from usage/,
  '类型，但可以从用法中推断出更好的类型',
]

const implicitlyHasAnReplacement: Replacement = [
  /implicitly has an/,
  '隐式具有',
]

const implicitlyHasTypeReplacement: Replacement = [
  /implicitly has type/,
  '隐式具有类型',
]

const elementImplicitlyHasAnReplacement: Replacement = [
  /Element implicitly has an/,
  '元素隐式具有',
]

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

const identifierExpectedReplacement: Replacement = [
  /Identifier expected/,
  '应为标识符',
]

const TS1381_1382: Replacement[] = [
  [/Unexpected token. Did you mean/, '意外的标记。你是想使用'],
  [/or/, '还是'],
]

const genericBugFix: Replacement[] = [
  [/</g, '&lt;'],
  [/>/g, '&gt;'],
  [/&lt;code&gt;/g, '<code alt="eslint-rules-translate-chinese-code-class">'],
  [/&lt;\/code&gt;/g, '</code>'],
]

const translationTable: TranslationTable = {
  TS1002: [
    [/Unterminated string literal/, '未终止的字符串字面量'],
    lastPeriodReplacement,
  ],
  // 示例
  // const a = {
  //   const d: Record<"string", string> = {
  //     string1: "hello", 里的 hello
  // }}
  TS1003: [identifierExpectedReplacement, lastPeriodReplacement],
  TS1005: [
    [htmlStartRegExp, '应为 <'],
    [/expected/, ''],
    lastPeriodReplacementEmptyString,
  ],
  // 不能在.d.ts文件里验证
  TS1006: [
    [/A file cannot have a reference to itself/, '文件不能引用自身'],
    lastPeriodReplacement,
  ],
  TS1015: [
    [
      /Parameter cannot have question mark and initializer/,
      '参数不能同时包含问号和初始化表达式',
    ],
    lastPeriodReplacement,
  ],
  TS1016: [
    [
      /A required parameter cannot follow an optional parameter/,
      '必选参数不能位于可选参数后',
    ],
    lastPeriodReplacement,
  ],
  TS1029: [
    [/modifier must precede/, '修饰符必须位于'],
    [/modifier/, '修饰符之前'],
    lastPeriodReplacement,
  ],
  TS1035: [
    [/Only/, '仅'],
    [/can use quoted names/, '可使用带引号的名称'],
    lastPeriodReplacement,
  ],
  // 不好翻译，不做翻译
  TS1036: [
    // [
    //   /Statements are not allowed in ambient contexts/,
    //   '不允许在环境上下文中使用语句',
    // ],
    // lastPeriodReplacement,
  ],
  // 不好翻译，不做翻译
  TS1038: [
    // [/A/, '不能在已有的环境上下文中使用'],
    // [/modifier cannot be used in an already ambient context/, '修饰符'],
    // lastPeriodReplacement,
  ],
  // 不好翻译，不做翻译
  TS1039: [
    // [
    //   /Initializers are not allowed in ambient contexts/,
    //   '不允许在环境上下文中使用初始化表达式',
    // ],
    // lastPeriodReplacement,
  ],
  // .d.ts 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头。
  TS1046: [
    [/Top-level declarations in/, ''],
    [/files must start with either a/, '文件中的顶级声明必须以'],
    [/or/, '或'],
    [/modifier/, '修饰符开头'],
    lastPeriodReplacement,
  ],
  // A 'get' accessor cannot have parameters.
  // "get" 访问器不能具有参数。
  TS1054: [
    [/A/, ''],
    [/accessor cannot have parameters/, '访问器不能具有参数'],
    lastPeriodReplacement,
  ],
  // 无法复现，不做翻译
  TS1055: [],
  // 无法复现，不做翻译
  TS1056: [],
  // bug修复
  // 异步函数或方法的返回类型必须为全局 Promise<T> 类型。你是否是指写入 "Promise<string>"?
  // The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<string>'?
  TS1064: [
    ...genericBugFix,
    [
      /The return type of an async function or method must be the/,
      '异步函数或方法的返回类型必须为',
    ],
    [/type. Did you mean to write/, '类型。你是否是指写入'],
  ],
  // 无法复现，不做翻译
  TS1066: [],
  // 意外的标记。应为构造函数、方法、访问器或属性。
  // Unexpected token. A constructor, method, accessor, or property was expected.
  TS1068: [
    [
      /Unexpected token. A constructor, method, accessor, or property was expected/,
      '意外的标记。应为构造函数、方法、访问器或属性',
    ],
    lastPeriodReplacement,
  ],
  // “private”修饰符不可出现在类型成员上。
  // 'private' modifier cannot appear on a type member.
  TS1070: [
    [/modifier cannot appear on a type member/, '修饰符不可出现在类型成员上'],
    lastPeriodReplacement,
  ],
  // "set" 访问器不能具有返回类型批注。
  // A 'set' accessor cannot have a return type annotation.
  TS1095: [
    [/A/, ''],
    [
      /accessor cannot have a return type annotation/,
      '访问器不能具有返回类型批注',
    ],
    lastPeriodReplacement,
  ],
  // 类型参数列表不能为空。
  // Type argument list cannot be empty.
  TS1099: [
    [/Type argument list cannot be empty/, '类型参数列表不能为空'],
    lastPeriodReplacement,
  ],
  // 仅允许在异步函数和模块顶层使用“for await”循环。
  // 'for await' loops are only allowed within async functions and at the top levels of modules.
  TS1103: [
    [
      /loops are only allowed within async functions and at the top levels of modules/,
      '循环仅允许在异步函数和模块顶层使用',
    ],
    lastPeriodReplacement,
  ],
  // 跳转目标不能跨越函数边界。
  // Jump target cannot cross function boundary.
  TS1107: [
    [/Jump target cannot cross function boundary/, '跳转目标不能跨越函数边界'],
    lastPeriodReplacement,
  ],
  TS1108: [
    [/A/, ''],
    [
      /statement can only be used within a function body/,
      '语句只能在函数体中使用',
    ],
    lastPeriodReplacement,
  ],
  TS1109: [[/Expression expected/, '应为表达式'], lastPeriodReplacement],
  // 示例
  // export default function AdvisoryApp(){
  //   return <>{getLayout(<Component {...pageProps} />)}</>; 里的 <> 要在ts文件里
  // }
  TS1110: [[/Type expected/, '应为类型'], lastPeriodReplacement],
  TS1117: [
    [
      /An object literal cannot have multiple properties with the same name/,
      '对象文本不能具有多个名称相同的属性',
    ],
    lastPeriodReplacement,
  ],
  // 不允许使用八进制文字。请使用语法
  // Octal literals are not allowed. Use the syntax '0o0'.
  TS1121: [
    [
      /Octal literals are not allowed. Use the syntax/,
      '不允许使用八进制文字。请使用语法',
    ],
    lastPeriodReplacementEmptyString,
  ],
  TS1127: [[/Invalid character/, '无效的字符'], lastPeriodReplacement],
  // 示例
  // [const d: Record<"string", string> = {
  //   string1: "hello",
  // }]
  // app.use((, res, next) => {}); 里的最后一个)
  TS1128: [
    [/Declaration or statement expected/, '应为声明或语句'],
    lastPeriodReplacement,
  ],
  // 示例
  // const const = const 里的 =
  TS1134: [
    [/Variable declaration expected/, '应为变量声明'],
    lastPeriodReplacement,
  ],
  // 示例
  // const a =[const d: Record<"string", string> = { 里的 const
  //   string1: "hello",
  // }]
  TS1137: [
    [/Expression or comma expected/, '应为表达式或逗号'],
    lastPeriodReplacement,
  ],
  // 示例
  // const a = (const asd） => { 里的 =>
  TS1138: [
    [/Parameter declaration expected/, '应为参数声明'],
    lastPeriodReplacement,
  ],
  // 示例
  // const a = {
  //   const d: Record<"string", string> = { 里的 "string"
  //     string1: "hello",
  // }}
  TS1139: [
    [/Type parameter declaration expected/, '应为类型参数声明'],
    lastPeriodReplacement,
  ],
  // 示例
  // @ApiOkResponse({ type: number }) 里的 最后一个括号
  TS1146: [[/Declaration expected/, '应为声明'], lastPeriodReplacement],
  // 太复杂，不做翻译
  TS1149: [],
  TS1155: [
    [htmlStartRegExp, '必须初始化<'],
    [/declarations must be initialized/, '声明'],
    lastPeriodReplacement,
  ],
  // 未终止的模板字面量。
  // Unterminated template literal.
  TS1160: [
    [/Unterminated template literal/, '未终止的模板字面量'],
    lastPeriodReplacement,
  ],
  // 示例
  // /declarations must be initialized
  TS1161: [
    [/Unterminated regular expression literal/, '未终止的正则表达式字面量'],
    lastPeriodReplacement,
  ],
  // 不好翻译，不做翻译
  // 只允许在生成器正文中使用 "yield" 表达式。
  // A 'yield' expression is only allowed in a generator body.
  TS1163: [],
  // 已看到 "implements" 子句。
  // 'implements' clause already seen.
  TS1175: [
    [htmlStartRegExp, '已看到 <'],
    [/clause already seen/, '子句'],
    lastPeriodReplacement,
  ],
  // 示例
  // const a =[const d: Record<"string", string> = {
  //   string1: "hello",
  // }]
  // [const d: Record<"string", string> = { 里的 const
  //     string1: "hello",
  // }]
  TS1181: [
    [/Array element destructuring pattern expected/, '应为数组元素析构模式'],
    lastPeriodReplacement,
  ],
  // 不能在环境上下文中声明实现。
  // An implementation cannot be declared in ambient contexts.
  TS1183: [
    // [/An implementation cannot be declared in/, '不能在'],
    // [lastPeriodRegExp, ' 中声明实现' + periodReplace],
    [
      /An implementation cannot be declared in ambient contexts/,
      '不能在 <code>ambient contexts</code> 中声明实现',
    ],
    lastPeriodReplacement,
  ],
  // 无法在 "--isolatedModules" 下编译“create.tsx”，因为它被视为全局脚本文件。请添加导入、导出或空的 "export {}" 语句来使它成为模块。
  // 'create.tsx' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
  TS1208: [
    [/cannot be compiled under/, '无法在'],
    [
      /because it is considered a global script file. Add an/,
      '下编译，因为它被视为全局脚本文件。请添加',
    ],
    [/statement to make it a module/, '语句来使它成为模块'],
    lastPeriodReplacement,
  ],
  TS1248: [
    [/A class member cannot have the/, '类成员不可具有'],
    [/keyword/, '关键字'],
    lastPeriodReplacement,
  ],
  // 示例
  // const person = {
  //     firstName = 'Jane', 里的 =
  // };
  TS1312: [
    [/\s*<code>/g, '<code>'],
    [/Did you mean to use a/, '你的意思是使用 '],
    questionMarkReplacement,
    [/An/, '当包含对象文字属于解构模式时，'],
    [
      /can only follow a property name when the containing object literal is part of a destructuring pattern/,
      '只能跟在属性名称的后面',
    ],
    lastPeriodReplacement,
  ],
  // 示例
  // const a = (const asd 里第二个 const
  TS1359: [
    [/Identifier expected. <\/span>\s*/, '应为标识符。</span>'],
    [/is a reserved word that cannot be used here/, '是保留字，不能在此处使用'],
    lastPeriodReplacement,
  ],
  // 示例
  // 见examples/z-error.tsx
  TS1381: TS1381_1382,
  // 示例
  // 见examples/z-error.tsx
  TS1382: TS1381_1382,
  // Unexpected keyword or identifier.
  // 意外的关键字或标识符。
  TS1434: [
    [/Unexpected keyword or identifier/, '意外的关键字或标识符'],
    lastPeriodReplacement,
  ],
  // 示例
  // mport RRule from 'rrule'; 里的 mport
  TS1435: [
    [
      /Unknown keyword or identifier. Did you mean/,
      '未知的关键字或标识符。你是不是指',
    ],
  ],
  // 已专门翻译，此处留作兜底
  // “TreeSelectProps”是一种类型，必须在启用 "verbatimModuleSyntax" 时使用仅类型导入进行导入。
  // 'TreeSelectProps' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
  TS1484: [
    [
      /is a type and must be imported using a type-only import when/,
      '是一种类型，在启用',
    ],
    [
      /is enabled/,
      `时必须使用 ${renderCodeBlockKeyword('type')} 关键字进行导入`,
    ],
    lastPeriodReplacement,
  ],
  // 示例
  // declare module hexo {} 里的 module
  TS1540: [
    [/A/, ''],
    [/declaration should not be declared using the/, '声明不应使用'],
    [/keyword. Please use the/, '关键字。请改用'],
    [/keyword instead/, '关键字'],
    lastPeriodReplacement,
  ],
  // 示例
  // const t = /?/ 里的 ?
  TS1507: [
    [/There is nothing available for repetition/, '没有可重复的内容'],
    lastPeriodReplacement,
  ],
  // 示例
  // enum Color {
  //   Red = 1,
  //   Red = 3 // TS2300: Duplicate identifier 'Red'.
  // }
  TS2300: [
    [/Duplicate identifier/, '标识符'],
    [lastPeriodRegExp, '重复' + periodReplace],
  ],
  TS2304: [cannotFindNameReplacement, lastPeriodReplacementEmptyString],
  // 模块“"react"”没有导出的成员“useCallb123123ack1”。
  // Module '"react"' has no exported member 'useCallb123123ack1'.
  TS2305: [
    moduleReplacement,
    hasNoExportedMemberReplacement,
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
  // 太复杂，不做翻译
  TS2322: [],
  // 翻译格式不对
  TS2339: [
    propertyReplacement,
    doesNotExistOnTypeReplacement,
    lastPeriodReplacementEmptyString,
  ],
  // 太复杂，尽量不翻译
  TS2345: [
    // [/Argument of type/, '类型'], 是不是翻译为 【类型为】比较好
    // [/is not assignable to parameter of type/, '的参数不能赋给类型'], 是不是翻译为 【的参数不能赋给类型为】比较好
    // [firstPeriodRegExp, '的参数' + periodReplace],
    // typeReplacement,
    // isMissingTheFollowingPropertiesFromTypeReplacement,
    // // <span>: <ul><li>age</li><li>email</li></ul></td>
    // colonWithOneAfterSpacePropertiesReplacement,
    // lastPeriodReplacementEmptyString,
  ],
  // 示例
  // const a: Record<1, number> = {
  //   address: 1,
  // }
  TS2353: [
    [
      /Object literal may only specify known properties, and/,
      '对象字面量只能指定已知属性，并且',
    ],
    doesNotExistInTypeReplacement,
    [lastPeriodRegExp, '中' + periodReplace],
  ],
  // A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.
  // 其声明类型不为 "undefined"、"void" 或 "any" 的函数必须返回值。
  TS2355: [
    [/A function whose declared type is neither/, '其声明类型不为'],
    [/, nor/, '或'],
    [/must return a value/, '的函数必须返回值'],
    lastPeriodReplacement,
  ],
  // 算术运算左侧必须是 "any"、"number"、"bigint" 或枚举类型。
  // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  // 示例
  // const userName = { name: "Benny" }
  // const userAge = { age: 35 }
  // const user = userName & userAge 里的 userName
  TS2362: [
    [
      /The left-hand side of an arithmetic operation must be of type/,
      '算术运算左侧必须是',
    ],
    [/or an enum type/, '或 enum 类型'],
    lastPeriodReplacement,
  ],
  // 示例
  // const userName = { name: "Benny" }
  // const userAge = { age: 35 }
  // const user = userName & userAge 里的 userAge
  TS2363: [
    [
      /The right-hand side of an arithmetic operation must be of type/,
      '算术运算右侧必须是',
    ],
    [/or an enum type/, '或 enum 类型'],
    lastPeriodReplacement,
  ],
  // Operator '+' cannot be applied to types 'number' and 'object'.
  // 运算符“+”不能应用于类型“number”和“object”。
  TS2365: [
    [/Operator/, '运算符'],
    [/cannot be applied to types/, '不能应用于类型'],
    andReplacement,
    lastPeriodReplacement,
  ],
  // 此比较似乎是无意的，因为类型“string”和“number”没有重叠。
  // This comparison appears to be unintentional because the types 'string' and 'number' have no overlap.
  TS2367: [
    [
      /This comparison appears to be unintentional because the types/,
      '此比较似乎是无意的，因为类型',
    ],
    andReplacement,
    [/have no overlap/, '没有重叠'],
    lastPeriodReplacement,
  ],
  TS2371: [
    [
      /A parameter initializer is only allowed in a function or constructor implementation/,
      '只允许在函数或构造函数实现中使用参数初始化表达式',
    ],
    lastPeriodReplacement,
  ],
  // 函数实现重复。
  // Duplicate function implementation.
  TS2393: [
    [/Duplicate function implementation/, '函数实现重复'],
    lastPeriodReplacement,
  ],
  // 太复杂，不做翻译
  // 类“Dog”错误实现接口“Animal”。
  //   属性“name”在类型“Dog”中是私有属性，但在类型“Animal”中不是。
  // Class 'Dog' incorrectly implements interface 'Animal'.
  //   Property 'name' is private in type 'Dog' but not in type 'Animal'.
  TS2420: [],
  // 导入声明与“React”的局部声明冲突。
  // Import declaration conflicts with local declaration of 'React'.
  TS2440: [
    [/Import declaration conflicts with local declaration of/, '导入声明与'],
    [lastPeriodRegExp, '的局部声明冲突' + periodReplace],
  ],
  // 原版翻译优化
  TS2448: [
    [/Block-scoped variable/, '块范围变量'],
    [/\s*used before its declaration/, '在声明之前就已使用'],
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
  // 示例
  // this.signin(); 里的 this
  TS2532: [isPossiblyReplacement, lastPeriodReplacementEmptyString],
  TS2551: [
    propertyReplacement,
    doesNotExistOnTypeReplacement,
    didYouMeanReplacement,
  ],
  TS2552: [cannotFindNameReplacement, didYouMeanReplacement],
  TS2554: [
    [/Expected/, '应有'],
    [/arguments, but got/, '个参数，但获得'],
    [lastPeriodRegExp, ' 个' + periodReplace],
  ],
  // 示例
  // const d: Record<"string", string> = {
  //   string1: "hello",
  // }
  TS2561: [
    [
      /Object literal may only specify known properties, but/,
      '对象字面量只能指定已知属性，但',
    ],
    doesNotExistInTypeReplacement,
    [/\. Did you mean to write/, '中。是否要写入'],
  ],
  // 示例
  // const a = (
  //   <Select placeholder="Please select a country">
  //       {/* TS2607 */}
  //       {/* TS2786 */}
  //       <Option value="china">China</Option> 里的 Option 不要导入组件
  //       <Option value="usa">U.S.A</Option>
  //   </Select>
  // )
  TS2607: [
    [
      /JSX element class does not support attributes because it does not have a/,
      'JSX 元素类不支持attributes，因为它不具有',
    ],
    propertyReplacement,
    lastPeriodReplacement,
  ],
  // 模块 ""./index"" 没有导出的成员 "BaseTestPage"。你是想改用 "import BaseTestPage from "./index"" 吗?
  // Module '"./index"' has no exported member 'BaseTestPage'. Did you mean to use 'import BaseTestPage from "./index"' instead?
  TS2614: [
    moduleReplacement,
    hasNoExportedMemberReplacement,
    [/. Did you mean to use/, '你是想改用'],
    [/instead/, '吗'],
  ],
  // 示例
  // const a = (
  //   <div></div>
  //   <div></div>
  // )
  TS2657: [
    [
      /JSX expressions must have one parent element/,
      'JSX 表达式必须具有一个父元素',
    ],
    lastPeriodReplacement,
  ],
  // "this" 隐式具有类型 "any"，因为它没有类型注释。
  // 'this' implicitly has type 'any' because it does not have a type annotation.
  TS2683: [
    implicitlyHasTypeReplacement,
    [/because it does not have a type annotation/, '因为它没有类型注释'],
    lastPeriodReplacement,
  ],
  // 示例
  // const a = { type: number } 里的 number
  TS2693: [
    [
      /only refers to a type, but is being used as a value here/,
      '仅表示类型，但在此处却作为值使用',
    ],
    lastPeriodReplacement,
  ],
  // 示例
  // app.use((, res, next) => {}); 里的第一个逗号
  TS2695: [
    [
      /Left side of comma operator is unused and has no side effects/,
      '逗号运算符的左侧未使用，没有任何副作用',
    ],
    lastPeriodReplacement,
  ],
  // 示例
  // import type { Store } from 'antd/es/form/interface';
  // interface RecurringEvent {
  //     title: Store.Frequency;
  // } 里的 Store
  TS2702: [
    [
      /only refers to a type, but is being used as a namespace here/,
      // '仅表示类型，但在此处却作为命名空间使用',
      '仅指类型，但在此用作命名空间',
    ],
    lastPeriodReplacement,
  ],
  // bug修复
  // “"react"”没有导出的成员“useCallback1”。你是否指的是“useCallback”?
  // '"react"' has no exported member named 'useCallback1'. Did you mean 'useCallback'?
  TS2724: [
    [/'/, '<code alt="eslint-rules-translate-chinese-code-string">'],
    [
      / <code> has no exported member named '/,
      '</code> 没有导出的成员 <code alt="eslint-rules-translate-chinese-code-variable">',
    ],
    [/. Did you mean/, '你是否指的是'],
  ],
  TS2739: [
    typeReplacement,
    isMissingTheFollowingPropertiesFromTypeReplacement,
    colonWithOneAfterSpacePropertiesReplacement,
  ],
  // 翻译格式不对
  TS2741: [
    propertyReplacement,
    [/\s*is missing in type/, '缺失在类型'],
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
  // 示例
  // const Option: {
  //   new() => HTMLOptionElement & {
  //       render: () => JSX.Element;
  //   }
  // } = {}
  // const a = <Option context="china">China</Option> 里的 Option
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
    [/:(?=[^:]*$)/, '中的以下属性:'],
    [/and/, '及其他'],
    [/more./, '项' + periodReplace],
  ],
  // 示例
  // const user = 1
  TS6133: [
    [htmlStartRegExp, '已声明 <'],
    // [/\s*is declared but its value is never read/, '，但从未读取其值'],
    [/is declared but its value is never read/, '但从未读取其值'],
    lastPeriodReplacement,
  ],
  TS6192: [
    [
      /All imports in import declaration are unused/,
      '导入声明中的所有导入都未使用',
    ],
    lastPeriodReplacement,
  ],
  // “Props”已声明，但从未使用过。
  // 'Props' is declared but never used.
  TS6196: [
    [/is declared but never used/, '已声明，但从未使用过'],
    lastPeriodReplacement,
  ],
  TS6198: [
    [/All destructured elements are unused/, '所有解构出的成员都未使用'],
    lastPeriodReplacement,
  ],
  // “parent”已弃用。
  // 'parent' is deprecated.
  TS6385: [[/is deprecated/, '已弃用'], lastPeriodReplacement],
  TS7005: [
    variableReplacement,
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  TS7006: [
    parameterReplacement,
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  // Member 'name' implicitly has an 'any' type.
  // 成员 'name' 隐式具有 'any' 类型。
  TS7008: [
    memberReplacement,
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  // 示例
  // this.config 里的 config
  // 元素隐式具有 "any" 类型，因为类型“typeof globalThis”没有索引签名
  TS7017: [
    elementImplicitlyHasAnReplacement,
    [/type because type/, '类型，因为类型'],
    [/has no index signature/, '没有索引签名'],
    lastPeriodReplacement,
  ],
  TS7022: [
    implicitlyHasTypeReplacement,
    [
      /because it does not have a type annotation and is referenced directly or indirectly in its own initializer/,
      // '，因为它不具有类型批注，且在其自身的初始化表达式中得到直接或间接引用',
      '因为它不具有类型批注，且在其自身的初始化表达式中得到直接或间接引用',
    ],
    lastPeriodReplacement,
  ],
  // 不好翻译，不做翻译
  TS7028: [
    // [/Unused label/, '未使用的标签'],
    // lastPeriodReplacement,
  ],
  TS7031: [
    [/Binding element/, '绑定元素'],
    implicitlyHasAnReplacement,
    lastTypeReplacement,
    lastPeriodReplacement,
  ],
  // 示例
  // const const = const asd 里的 asd
  TS7043: [
    variableReplacement,
    implicitlyHasAnReplacement,
    inferredFromUsageReplacement,
    lastPeriodReplacement,
  ],
  TS7044: [
    parameterReplacement,
    implicitlyHasAnReplacement,
    inferredFromUsageReplacement,
    lastPeriodReplacement,
  ],
  // 示例
  // interface BadApi {
  //   foo() string // 里的 string
  // }
  TS7045: [
    memberReplacement,
    implicitlyHasAnReplacement,
    inferredFromUsageReplacement,
    lastPeriodReplacement,
  ],
  // 示例
  // interface BadApi {
  //   foo() string // 里的 )
  // }
  TS7050: [
    implicitlyHasAnReplacement,
    [/return /, '返回'],
    inferredFromUsageReplacement,
    lastPeriodReplacement,
  ],
  // 示例
  // const multiply: (any) => void 里的 any
  TS7051: [
    [
      /Parameter has a name but no type. Did you mean/,
      '参数具有名称，但不具有类型。你是想使用',
    ],
    questionMarkReplacement,
  ],
  // 翻译格式不对 （找不到具有类型为）
  // 不好翻译
  TS7053: [
    elementImplicitlyHasAnReplacement,
    typeWithSpaceReplacement,
    [/because expression of type/, '，因为类型为'],
    [/can't be used to index type/, '的表达式不能用于索引类型'],
    // [/No index signature with a parameter of type/, '找不到具有类型为'],
    // [/was found on type/, '的参数的索引签名在类型'],
    propertyReplacement,
    doesNotExistOnTypeReplacement,
    // allPeriodReplacementEmptyString,
  ],
  // 示例 在js文件里写ts类型注释
  // 类型注释只能在 TypeScript 文件中使用。
  // Type annotations can only be used in TypeScript files.
  TS8010: [
    [
      /Type annotations can only be used in TypeScript files/,
      `类型注释只能在 ${renderCodeBlock('TypeScript')} 文件中使用`,
    ],
    lastPeriodReplacement,
  ],
  // 示例
  // const a = <div title={}>Title</div> 里的 {}
  TS17000: [
    [
      /JSX attributes must only be assigned a non-empty/,
      '只能为 JSX 属性分配非空',
    ],
    [/expression/, '表达式'],
    lastPeriodReplacementEmptyString,
  ],
  // 不好翻译，不做翻译
  TS18004: [
    // [
    //   / . Either declare one or provide an initializer./,
    //   '。请声明一个值或提供一个初始值设定项。',
    // ],
  ],
  // obj 可能为 unknown
  TS18046: [[/is of type/, '的类型为'], lastPeriodReplacementEmptyString],
  // obj 可能为 null
  TS18047: [isPossiblyReplacement, lastPeriodReplacementEmptyString],
  // obj 可能为 undefined
  TS18048: [isPossiblyReplacement, lastPeriodReplacementEmptyString],
  // 文件是 CommonJS 模块; 它可能会转换为 ES 模块。
  // File is a CommonJS module; it may be converted to an ES module.
  TS80001: [
    [
      /File is a CommonJS module; it may be converted to an ES module/,
      `文件是 ${renderCodeBlockClass(
        'CommonJS',
      )} 模块; 它可能会转换为 ${renderCodeBlockClass('ES')} 模块`,
    ],
    lastPeriodReplacement,
  ],
  // 示例
  // react/index.d.ts 里 import * as PropTypes from "prop-types"; 的 PropTypes
  TS80003: [
    [/Import may be converted to a default import/, '导入可能会转换为默认导入'],
    lastPeriodReplacementEmptyString,
  ],
}

import { Diagnostic } from 'vscode-languageserver-types'

export function translate(formatted: string, diagnostic: Diagnostic) {
  // console.log('%c Line:741 🎂 diagnostic', 'color:#33a5ff', diagnostic)
  console.log(
    `%c code:${diagnostic.code} 🥐 formatted`,
    'color:#b03734',
    formatted,
  )

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

  // “TreeSelectProps”是一种类型，必须在启用 "verbatimModuleSyntax" 时使用仅类型导入进行导入。
  // 'TreeSelectProps' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
  if (code === 'TS1484') {
    //  <code>TreeSelectProps</code>  is a type and must be imported using a type-only import when  <code>verbatimModuleSyntax</code>  is enabled.
    const matchContent = formatted.match(
      // eslint-disable-next-line no-regex-spaces
      /<code>(.+?)<\/code>  is a type and must be imported using a type-only import when  <code>verbatimModuleSyntax<\/code>  is enabled/,
    )
    if (matchContent) {
      const varName = matchContent[1]

      return `${renderCodeBlockClass(
        varName,
      )} 是一种类型，在启用 ${renderCodeBlockProperty(
        'verbatimModuleSyntax',
      )} 时必须使用 ${renderCodeBlockVariable('type ' + varName)} 进行导入。`
    }
  }

  // 导出的变量“meta”具有或正在使用外部模块“"Select"”中的名称“SelectProps”，但不能为其命名。
  // Exported variable 'meta' has or is using name 'SelectProps' from external module "Select" but cannot be named.
  if (code === 'TS4023') {
    /*
    Exported variable  <code>meta</code>  has or is using name  <code>FolderSelectProps</code>  from external module </span>
    <span class="codicon codicon-none" style="background-color:var(--vscode-textCodeBlock-background);">

    ```type
      "/Users/ih_shigongzhi/Code/HypergryphProject/ark-components/packages/FolderSelect/index"
    ```

    </span>
    <span> but cannot be named.
    */
    const matchContent = formatted.match(
      // [\s\S] 匹配所有字符(包括空白和非空白,即所有字符)。还添加了 ? 使其成为非贪婪匹配,这样可以准确匹配到第一个 "but cannot be named" 之前的内容。
      // 跟下面效果一样，下面使用 s 标志 (dotAll 模式)的写法更简洁。s 标志 让 . 也能匹配换行符
      // /Exported variable  <code>(.+?)<\/code>  has or is using name  <code>(.+?)<\/code>  from external module ([\s\S]*?) but cannot be named/,
      // eslint-disable-next-line no-regex-spaces
      /Exported variable  <code>(.+?)<\/code>  has or is using name  <code>(.+?)<\/code>  from external module (.*?) but cannot be named/s,
    )
    console.log('%c Line:1023 🍖 matchContent', 'color:#ea7e5c', matchContent)
    if (matchContent) {
      const varName = matchContent[1]
      const typeName = matchContent[2]
      const moduleName = matchContent[3]

      return `导出的变量 ${renderCodeBlockVariable(
        varName,
      )} 具有或正在使用外部模块 ${moduleName} 中的名称 ${renderCodeBlockClass(
        typeName,
      )} 你需要导出 ${moduleName} 中的 ${renderCodeBlockClass(typeName)}`
    }
  }

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

function renderCodeBlock(content: string) {
  return `<code>${content}</code>`
}

function renderCodeBlockVariable(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-variable">${content}</code>`
}

function renderCodeBlockProperty(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-property">${content}</code>`
}

function renderCodeBlockFunction(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-function">${content}</code>`
}

function renderCodeBlockParameter(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-parameter">${content}</code>`
}

function renderCodeBlockClass(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-class">${content}</code>`
}

function renderCodeBlockKeyword(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-keyword">${content}</code>`
}

function renderCodeBlockString(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-string">${content}</code>`
}

function renderCodeBlockNumber(content: string) {
  return `<code alt="eslint-rules-translate-chinese-code-number">${content}</code>`
}

// 全局替换句号有问题
// Object.values(translationTable).forEach((replacements) => {
//   replacements.unshift([/\./g, '。'])
// })
