# 支持中文语境下更好地展示 ts 报错

<div
  style="display: flex;gap: 10px;"
>
  <div>
    <img src="z/PixPin_2025-08-18_21-18-11.gif">
  </div>
  <div>
    <img src="z/image1.png">
  </div>
</div>

# 中文原生不合理的翻译优化

<div
  style="display: flex;gap: 10px;"
>
  <div>
    <img src="z/image2.png">
  </div>
</div>

# 隐藏原始报错

如何隐藏原始错误并使类型可复制
按照[那里的说明](https://github.com/yoavbls/pretty-ts-errors/blob/HEAD/docs/hide-original-errors.md)进行操作。不幸的是，由于 VSCode 的限制，需要进行此 hack。

上面是原版插件给出的解决方案，我发现不够完美，仍有部分原生报错无法避免，下面是我的 CSS 解决方案，可以参考一下：
[CSS 文件](./z/pretty-ts-errors-hack.css)

在有 ts 报错的场景下，使用我推荐的 CSS 文件中可选的暴力样式，最好安装我的另一个插件，可以看一下，也很不错呦。[中文展示 eslint 规则提示，且美化展示效果](https://marketplace.visualstudio.com/items?itemName=SoulFriends.eslint-rules-zh-with-pretty)，附图

<div>
  <img src="./z/image.png">
</div>

# 此插件原版说明如下

<!-- <a href="https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors" style="display: none;">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/main/assets/icon.png" width="140">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/main/assets/icon.png" width="140">
    <img src="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/main/assets/empty.png" alt="Logo">
  </picture>
</a> -->

# Pretty `TypeScript` Errors

<b>Make TypeScript errors prettier and human-readable in VSCode.</b>

[![GitHub stars](https://img.shields.io/github/stars/yoavbls/pretty-ts-errors.svg?style=social&label=Star)](https://GitHub.com/yoavbls/pretty-ts-errors/stargazers/)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)&nbsp;[![GitHub license](https://badgen.net/github/license/yoavbls/pretty-ts-errors)](https://github.com/yoavbls/pretty-ts-errors/blob/main/LICENSE)&nbsp;[![Visual Studio Code](https://img.shields.io/visual-studio-marketplace/i/yoavbls.pretty-ts-errors)](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
<a href="https://github.com/yoavbls/pretty-ts-errors/discussions/43#user-content-jetbrains-support"><img src="https://cdn.icon-icons.com/icons2/2530/PNG/512/jetbrains_webstorm_button_icon_151873.png" height="20" alt="Webstorm logo"></a>

TypeScript errors become messier as the complexity of types increases. At some point, TypeScript will throw on you a shitty heap of parentheses and `"..."`.
This extension will help you understand what's going on. For example, in this relatively simple error:

<img src="./assets/this.png" width="340.438px" />&nbsp; &nbsp; <img src="./assets/instead-of-that.png" width="350px" />

## Watch this

<a href="https://www.youtube.com/watch?v=9RM2aErJs-s" target="_blank">
 <img src="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/theo-video.png" alt="Watch theo's video" width="600" />
</a>

and others from:
[Web Dev Simplified](https://www.youtube.com/watch?v=ccg-erZYO4k&list=PL0rc4JAdEsVpOriHzlAG7KUnhKIK9c7OR&index=1),
[Josh tried coding](https://www.youtube.com/watch?v=_9y29Cyo9uU&list=PL0rc4JAdEsVpOriHzlAG7KUnhKIK9c7OR&index=3),
[trash dev](https://www.youtube.com/watch?v=WJeD3DKlWT4&list=PL0rc4JAdEsVpOriHzlAG7KUnhKIK9c7OR&index=4&t=208),
and [more](https://www.youtube.com/playlist?list=PL0rc4JAdEsVpOriHzlAG7KUnhKIK9c7OR)

## Features

- Syntax highlighting with your theme colors for types in error messages, supporting both light and dark themes
- A button that leads you to the relevant type declaration next to the type in the error message
- A button that navigates you to the error at [typescript.tv](http://typescript.tv), where you can find a detailed explanation, sometimes with a video
- A button that navigates you to [ts-error-translator](https://ts-error-translator.vercel.app/), where you can read the error in plain English

## Supports

- Node and Deno TypeScript error reporters (in `.ts` files)
- JSDoc type errors (in `.js` and `.jsx` files)
- React, Solid and Qwik errors (in `.tsx` and `.mdx` files)
- Astro, Svelte and Vue files when TypeScript is enabled (in `.astro`, `.svelte` and `.vue` files)
- Ember and Glimmer TypeScript errors and template issues reported by Glint (in `.hbs`, `.gjs`, and `.gts` files)

## Installation

```
code --install-extension yoavbls.pretty-ts-errors
```

Or simply by searching for `pretty-ts-errors` in the [VSCode marketplace](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)

#### How to hide the original errors and make the types copyable

Follow the instructions [there](./docs/hide-original-errors.md). unfortunately, this hack is required because of VSCode limitations.

## Why isn't it trivial

1. TypeScript errors contain types that are not valid in TypeScript.
   Yes, these types include things like `... more ...`, `{ ... }`, etc in an inconsistent manner. Some are also cutting in the middle because they're too long.
2. Types can't be syntax highlighted in code blocks because the part of `type X = ...` is missing, so I needed to create a new TextMate grammar, a superset of TypeScript grammar called `type`.
3. VSCode markdown blocks all styling options, so I had to find hacks to style the error messages. e.g., there isn't an inlined code block on VSCode markdown, so I used a code block inside a codicon icon, which is the only thing that can be inlined. That's why it can't be copied. but it isn't a problem because you can still hover on the error and copy things from the original error pane.
   <img src="./assets/errors-hover.png" width="600" />

## Hype section

<a href="https://www.youtube.com/live/Zze1y2iZ3bQ?si=Yj1Qw2S8FbGbTA5c&t=11589">
  <picture>
    <img width="400" src="https://github.com/yoavbls/pretty-ts-errors/blob/assets/assets/mentions/js-nation.png?raw=true" alt="Winning the Productivity Booster category at JSNation 2023">
  </picture>
</a>
<a href="https://twitter.com/tannerlinsley/status/1647982562026090496">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/tanner-dark.png#gh-light-mode-only">
     <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/tanner-light.png#gh-light-mode-only">
    <img width="400" src="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/tanner-dark.png#gh-dark-mode-only" alt="Tanner's tweet">
  </picture>
</a>
<a href="https://twitter.com/t3dotgg/status/1647759462709747713">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/theo-dark.png#gh-dark-mode-only">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/theo-light.png#gh-light-mode-only">
    <img width="400" src="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/theo-dark.png#gh-dark-mode-only" alt="Theo's tweet">
  </picture>
</a>
<a href="https://twitter.com/johnsoncodehk/status/1646214711204286465">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/johnson-dark.png#gh-dark-mode-only">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/johnson-light.png#gh-light-mode-only">
    <img width="400" src="https://raw.githubusercontent.com/yoavbls/pretty-ts-errors/assets/assets/mentions/johnson-dark.png#gh-dark-mode-only" alt="Johnson's tweet">
  </picture>
</a>

### Stars from stars

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/kentcdodds">
          <img src="https://images.weserv.nl/?url=github.com/kentcdodds.png&fit=cover&mask=circle" width="80"><br>
          Kent C. Dodds
        <a/>
      </td>
      <td align="center">
        <a href="https://github.com/mattpocock">
          <img src="https://images.weserv.nl/?url=github.com/mattpocock.png&fit=cover&mask=circle" width="80"><br>
          Matt Pocock
        <a/>
      </td>
      <td align="center">
        <a href="https://github.com/katt">
          <img src="https://images.weserv.nl/?url=github.com/katt.png&fit=cover&mask=circle" width="80"><br>
          Alex / KATT
        <a/>
      </td>
      <td align="center">
        <a href="https://github.com/tannerlinsley">
          <img src="https://images.weserv.nl/?url=github.com/tannerlinsley.png&fit=cover&mask=circle" width="80"><br>
          Tanner Linsley
        <a/>
      </td>
      <td align="center">
        <a href="https://github.com/t3dotgg">
          <img src="https://images.weserv.nl/?url=github.com/t3dotgg.png&fit=cover&mask=circle" width="80"><br>
          Theo Browne
        <a/>
      </td>
    </tr>
  </tbody>
</table>

## Sponsorship

Every penny will be invested in other contributors to the project, especially ones that work
on things that I can't be doing myself like adding support to the extension for other IDEs 🫂

## Contribution

Help by upvoting or commenting on issues we need to be resolved [here](https://github.com/yoavbls/pretty-ts-errors/discussions/43)
Any other contribution is welcome. Feel free to open any issue / PR you think.
