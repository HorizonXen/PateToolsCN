#!/usr/bin/env python3
"""Build the Paletools Simplified Chinese companion userscript."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
EN_JSON = ROOT / "en-strings.json"
LINES = (ROOT / "zh-lines.txt").read_text(encoding="utf-8").splitlines()
EN = json.loads(EN_JSON.read_text(encoding="utf-8"))
if len(LINES) != len(EN):
    raise SystemExit(f"line count {len(LINES)} != english {len(EN)}")

EXTRAS = {
    "The import process will clear all your data before inserting the new one": "导入会先清空你的全部数据，再写入新数据",
    "Dear user, since Paletools allows you to perform actions that were not design by EA and allows you to be much quicker in the usage of the WebApp you are at a potential risk of ban from EA": "Paletools 能执行 EA 没有设计的操作，也会让你更快地使用网页。因此存在被 EA 封禁的风险。",
    "Therefore you shall use it at your own discretion and you should be very cautious": "是否使用由你自己决定，请保持谨慎。",
    "If you perform too many snipes in a row you might get a soft market ban or even worst a ": "如果连续进行太多次截卡，可能会被暂时限制市场，甚至被",
    "permanent ban from the transfer market": "永久禁止使用转会市场",
    "Please ": "请",
    "USE THIS TOOL AT YOUR OWN RISK": "自行承担使用风险",
    "Thanks a have a nice day!": "谢谢，祝你有美好的一天！",
    "Opened Packs:": "已打开的卡包：",
    "Total Players:": "球员总数：",
    "Players sent to Club:": "送到俱乐部的球员：",
    "Players sent to Transfer list:": "送到转会列表的球员：",
    "Discarded Players:": "丢弃的球员：",
    "Duplicated Players:": "重复球员：",
    "Total Managers:": "经理总数：",
    "Managers sent to Club:": "送到俱乐部的经理：",
    "Managers sent to Transfer List:": "送到转会列表的经理：",
    "Discarded Managers:": "丢弃的经理：",
    "Duplicated Managers:": "重复经理：",
    "Total Items:": "物品总数：",
    "Items sent to Club:": "送到俱乐部的物品：",
    "Items sent to Transfer List:": "送到转会列表的物品：",
    "Discarded Items:": "丢弃的物品：",
    "Duplicated Items:": "重复物品：",
    "Coins Spent:": "花费金币：",
    "Coins Earned:": "获得金币：",
    "========== PALETOOLS ALERT ==========\n\nYou need to be in an SBC solution for this tool to work!\n\n========================================\n\n¡Usted necesita estar en una solución de SBC para que funcione esta herramienta!": "========== PALETOOLS 提示 ==========\n\n这个书签只能在 SBC 方案页使用。\n\nFUTBIN 地址需要包含 /squad/数字/sbc。\nEasySBC 地址需要包含 easysbc.io/sbc-solution。",
    "========== PALETOOLS ==========\n\nSBC succesfully exported, now go to Paletools and hit import SBC button\n\n========================================\n\nSBC exportado correctamente, ahora ve a Paletools y presiona el boton importar SBC": "========== PALETOOLS ==========\n\nSBC 已导出。回到网页，打开同一组 SBC，点击“导入 SBC”。\n\n在此之前不要复制其他文字。",
}

entries = []
seen = set()
for item, zh in zip(EN, LINES):
    en = item["en"]
    if en in seen:
        continue
    seen.add(en)
    entries.append((en, zh))
for en, zh in EXTRAS.items():
    if en not in seen:
        entries.append((en, zh))

entries.sort(key=lambda pair: len(pair[0]), reverse=True)
payload = json.dumps(entries, ensure_ascii=False, separators=(",", ":"))

runtime = r"""// ==UserScript==
// @name         Paletools 简体中文
// @namespace    eafcmaster.paletools.zh
// @version      1.1.0
// @description  把 Paletools 27.1.5 在中文网页上回退显示的英文界面换成简体中文。不修改 Paletools 本体，官方自动更新不会清掉这份翻译。
// @author       HorizonXen
// @updateURL    https://raw.githubusercontent.com/HorizonXen/PateToolsCN/main/paletools-zh.user.js
// @downloadURL  https://raw.githubusercontent.com/HorizonXen/PateToolsCN/main/paletools-zh.user.js
// @match        https://www.ea.com/ea-sports-fc/ultimate-team/web-app/*
// @match        https://www.ea.com/*/ea-sports-fc/ultimate-team/web-app/*
// @match        https://www.futbin.com/*
// @match        https://www.easysbc.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PAIRS = __PAIRS__;
  const EXACT = new Map();
  const TEMPLATES = [];

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function compile(en, zh) {
    const names = [];
    const pieces = en.split(/(\{[^}]+\}|#SECONDS#)/);
    let hasPlaceholder = false;
    const source = pieces.map(function (piece) {
      const named = /^\{([^}]+)\}$/.exec(piece);
      if (named) {
        hasPlaceholder = true;
        names.push(named[1]);
        return "([\\s\\S]+?)";
      }
      if (piece === "#SECONDS#") {
        hasPlaceholder = true;
        names.push("SECONDS");
        return "([\\s\\S]+?)";
      }
      return escapeRegExp(piece).replace(/(^|[^A-Za-z0-9])#(?![A-Za-z0-9])/g, function (match, prefix) {
        hasPlaceholder = true;
        names.push("#");
        return (prefix || "") + "([\\s\\S]+?)";
      });
    }).join("");
    if (!hasPlaceholder) return null;
    return { re: new RegExp("^" + source + "$"), names: names, zh: zh };
  }

  PAIRS.forEach(function (pair) {
    const en = pair[0];
    const zh = pair[1];
    const template = compile(en, zh);
    if (template) TEMPLATES.push(template);
    else EXACT.set(en, zh);
  });

  function applyTemplate(text) {
    for (let i = 0; i < TEMPLATES.length; i += 1) {
      const template = TEMPLATES[i];
      const match = template.re.exec(text);
      if (!match) continue;
      const values = { "#": match[1] };
      template.names.forEach(function (name, index) {
        values[name] = match[index + 1];
      });
      return template.zh.replace(/\{([^}]+)\}|#SECONDS#|#/g, function (token, name) {
        if (token === "#SECONDS#") return values.SECONDS || "";
        if (token === "#") return values["#"] || "";
        return values[name] == null ? token : values[name];
      });
    }
    return null;
  }

  function translate(text) {
    if (!text) return null;
    if (EXACT.has(text)) return EXACT.get(text);
    return applyTemplate(text);
  }

  const ALERTS = [
    ["You need to be in an SBC solution", "========== PALETOOLS 提示 ==========\n\n这个书签只能在 SBC 方案页使用。\n\nFUTBIN 地址需要包含 /squad/数字/sbc。\nEasySBC 地址需要包含 easysbc.io/sbc-solution。"],
    ["succesfully exported", "========== PALETOOLS ==========\n\nSBC 已导出。回到网页，打开同一组 SBC，点击“导入 SBC”。\n\n在此之前不要复制其他文字。"]
  ];

  function translateAlert(message) {
    const text = String(message || "");
    for (let i = 0; i < ALERTS.length; i += 1) {
      if (text.indexOf(ALERTS[i][0]) !== -1) return ALERTS[i][1];
    }
    return translate(text) || text;
  }

  if (globalThis.__PALETOOLS_ZH_TEST__) {
    globalThis.__PALETOOLS_ZH_TEST__.translate = translate;
    globalThis.__PALETOOLS_ZH_TEST__.translateAlert = translateAlert;
    return;
  }

  if (/futbin\.com|easysbc\.io/.test(location.hostname)) {
    const nativeAlert = window.alert;
    window.alert = function (message) {
      return nativeAlert.call(window, translateAlert(message));
    };
    return;
  }

  const MIN_GLOBAL = 8;
  let scheduled = false;

  function allowed(node, translatedFrom) {
    if (translatedFrom.length >= MIN_GLOBAL) return true;
    const parent = node.parentElement;
    if (!parent) return false;
    return Boolean(parent.closest("[class*='paletools']"));
  }

  function translateTextNode(node) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const trimmed = raw.trim();
    const next = translate(trimmed);
    if (!next || next === trimmed || !allowed(node, trimmed)) return;
    node.nodeValue = raw.replace(trimmed, next);
  }

  function translateElement(element) {
    if (!element || element.nodeType !== 1) return;
    const tag = element.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA" || tag === "INPUT") return;
    const html = element.innerHTML;
    if (html && EXACT.has(html)) {
      element.innerHTML = EXACT.get(html);
      return;
    }
    const children = element.childNodes;
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.nodeType === 3) translateTextNode(child);
      else if (child.nodeType === 1) translateElement(child);
    }
  }

  function scan() {
    scheduled = false;
    if (document.body) translateElement(document.body);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(scan);
  }

  function installLayoutFix() {
    if (document.getElementById("paletools-zh-layout")) return;
    const style = document.createElement("style");
    style.id = "paletools-zh-layout";
    style.textContent = `
.donation-panel {
  display: inline-flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 12px !important;
  font-size: 10px !important;
  min-width: 68px;
  height: auto !important;
  margin-right: 12px !important;
  padding: 2px 8px !important;
  position: relative !important;
  overflow: visible !important;
  white-space: nowrap !important;
  vertical-align: middle;
}
.donation-panel > div {
  display: block !important;
  position: static !important;
  line-height: 12px !important;
  font-size: 10px !important;
  height: auto !important;
  white-space: nowrap !important;
}`;
    (document.head || document.documentElement).appendChild(style);
  }

  function boot() {
    installLayoutFix();
    scan();
    new MutationObserver(schedule).observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
"""

runtime = runtime.replace("__PAIRS__", payload)
out = ROOT / "paletools-zh.user.js"
out.write_text(runtime, encoding="utf-8")
print(f"wrote {out} entries={len(entries)} bytes={out.stat().st_size}")
