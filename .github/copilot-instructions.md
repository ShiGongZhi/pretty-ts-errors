# Copilot Instructions

## 项目概览

- 这是一个 VSCode 扩展，用于把 TypeScript 诊断转换成更易读的悬浮提示；实体代码全部放在 `src/`，打包产物在 `dist/`。
- 扩展在 `src/extension.ts` 中注册 `languages.onDidChangeDiagnostics`，只处理来自 `ts`、`deno-ts`、`js`、`glint` 等来源的诊断，并把格式化后的 `MarkdownString` 缓存在 `uriStore` 中以复用渲染结果。
- `uriStore`（`src/provider/uriStore.ts`）以文件绝对路径为键维护 hover 内容；修改诊断收集逻辑时务必保持范围 (`Range`) 与内容数组同步，以免 hover 提示错位。

## Hover 与调试链路

- 悬浮提示通过 `src/provider/hoverProvider.ts` 返回缓存内容；任何格式化变更都要保证 `MarkdownString.isTrusted = true` 并在 `extension.ts` 中启用 `supportHtml`。
- 本地调试可利用 `registerSelectedTextHoverProvider`（开发模式专用，限定匹配 `test/**/*.ts`）直接格式化选中文本；扩展非开发模式不会注册该 provider。
- 若支持新的语言或错误来源，需要在 `languages.onDidChangeDiagnostics` 中更新过滤条件，并为新 languageId 注册 hover provider。

## 诊断格式化流水线

- `formatDiagnostic`（`src/format/formatDiagnostic.ts`）会调用以下步骤：`embedSymbolLinks` → `identSentences` → `formatDiagnosticMessage` → `prettify`，最终插入组件化的 HTML 片段。
- `embedSymbolLinks` 利用 `diagnostic.relatedInformation` 生成跳转到符号定义的链接（`vscode-uri`），保证相关消息格式不变以免正则失效。
- `formatDiagnosticMessage`（`src/format/formatDiagnosticMessage.ts`）包含大量针对原始 TS 错误文本的正则替换，输出 `formatTypeBlock` 包裹的代码片段；调整正则时注意 VSCode Markdown 的净化限制。
- `formatTypeBlock`/`prettifyType` 调用 `prettier@2`（`src/format/prettify.ts`）并在失败时回退到原始文本；添加新类型处理时保持 `printWidth: 60` 的排版假设。
- `addMissingParentheses`（`src/format/addMissingParentheses.ts`）修补 TS 错误中不完整的括号与字符串；若更改占位符，需同步 `convertToOriginalType` 的还原逻辑。

## 组件与 HTML 约定

- `ts-dedent` 通过别名 `d`（`src/utils.ts`）统一处理模板缩进；任何内联 HTML 都应使用 `d/*html*/
` 模式。
- `spanBreak`、`miniLine`、`codeBlock` 等组件（位于 `src/components/`）负责插入额外 `<span>` 与 codicon，以绕过 VSCode Markdown 的样式限制；不要在格式化输出里手写裸 `<span>` 重复逻辑。
- `title` 组件根据 `KNOWN_ERROR_NUMBERS`（`src/components/consts/knownErrorNumbers.ts`）插入 TypeScript.TV 与 `ts-error-translator` 链接；新增常见错误时同步更新该集合。
- 语法高亮依赖 `syntaxes/type.tmGrammar.json` 扩展 TS TextMate 语法；若支持新的语法片段，请先验证 hover 中的 `source.type` 高亮效果。

## 构建与发布流程

- 常用命令：`npm run watch`（esbuild watch，调用 `scripts/build.js`）、`npm run compile`（单次构建）、`npm run package`（生产构建，打开 `--production`）、`npm run lint`（ESLint + `tsc --noEmit`）、`npm test`（mocha 端到端，依赖 `out/test`）。
- VSCode 任务面板已配置 `npm: watch` 与 `npm: watch-tests`，适合开发期同时监测打包与测试编译。
- `scripts/build.js` 使用 esbuild `context` API，并通过自定义插件把 `path` 指向 `path-browserify`、注入 `process-shim`；在扩展中引用 Node 内置模块时先确认是否需要类似处理。
- 项目要求 Node `20.18.x`（`package.json`），VSCode engine 最低 `^1.77.0`；升级依赖需确保与这些约束兼容。
- `dist/` 与 `out/` 为生成目录（`.gitignore` 中忽略，但仓库可能留有旧产物），修改功能时务必编辑 `src/` 并重新构建。

## 其他资料

- `docs/hide-original-errors.md` 与 `z/pretty-ts-errors-hack.css` 给出了隐藏原生错误面板的补丁；文档与 CSS 需要同步更新。
- `examples/` 提供 TypeScript、Vue 示例类型，便于录制演示或人工回归。
- 若新增 i18n 资源，请放在 `src/i18n/` 并与格式化管线对接；当前目录为空，可作为扩展点。
- 任何新增的 hover 行为都要考虑缓存淘汰策略（`cache` map 在 `extension.ts` 中限制为 100 条）。保留或调整这个上限时要同步说明动机。
