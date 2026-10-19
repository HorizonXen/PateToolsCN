# PateToolsCN

Paletools 27.1.5 的简体中文界面。它是一份独立的油猴脚本，把中文网页上 Paletools 回退显示的英文换成中文。

这是 [EAFCMaster](https://github.com/HorizonXen/EAFCMaster) 产出的第一个可安装产品。

## 它做什么

- 把 Paletools 的设置、按钮和提示译成简体中文。导入 SBC 会显示为「导入 SBC」。
- 把 FUTBIN / EasySBC 方案页上 Paletools 导出书签的英文提示译成中文。
- 给顶部版本号一块单独的行高，避免 `v27.1.5` 和 `by Paleta` 叠在一起。

## 它不做什么

这份脚本没有 Paletools 的功能。导入 SBC、导出书签和其他面板都来自 Paletools 本体。两份要一起留着：

| 油猴里的名字 | 作用 |
|---|---|
| Paletools | 功能本体，当前核对的是 27.1.5 |
| Paletools 简体中文 | 只翻译界面 |

删掉 Paletools 之后，中文脚本还在，但没有界面可以翻译。

Paletools 由 Paleta 维护，项目站点是 [pale.tools](https://pale.tools/)。PateToolsCN 不修改、也不重新分发 Paletools 程序。

## 安装

1. 用 Tampermonkey 安装 [Paletools 27.1.5](https://pale.tools/fifa/dist/latest/paletools.user.js)。Chrome 需要允许用户脚本。
2. 安装本翻译：

   https://raw.githubusercontent.com/HorizonXen/PateToolsCN/main/paletools-zh.user.js

3. 登录 EA FC Ultimate Team 网页后刷新一次。

当前翻译依据 Paletools **27.1.5** 的英文界面，核对于 2026-10-19。Paletools 改了英文原文之后，对应句子会暂时留在英文，直到这里的词表更新。

## 维护翻译

英文和中文按同一行号对齐：

- `en-strings.json`：从 Paletools 27.1.5 抽出的英文界面句子，不要改顺序。
- `zh-lines.txt`：对应的简体中文，一行一句。
- `build.py`：生成 `paletools-zh.user.js`。

```sh
python3 build.py
node --check paletools-zh.user.js
```

发布前在 `build.py` 里提高 `@version`。`@updateURL` 指向本仓库的 `main`，装过这份脚本的浏览器可以在油猴里检查更新。

少于 8 个字符的英文只在带 `paletools` 类名的面板里替换，避免改到游戏自己的短词。

## 风险

Paletools 和这份翻译都不是 EA 的产品。EA 的公开规则要求使用官方入口，并限制第三方扩展、机器人和自动购买。Paletools 自己的警告也写了账号可能被限制。使用由安装者自己决定。

## 许可

本仓库的翻译脚本、词表和构建脚本使用 [MIT](LICENSE)。Paletools 的程序、名称和界面原文属于其各自的权利人。
