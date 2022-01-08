# core-js 和垫片理念：设计一个“完美”的 polyfill 方案

## 要点

1，core-js 是一个 JavaScript 标准库，它包含 ECMAScript2020 在内的多项特性的 polyfills，以及 ECMAScript 在 proposals 阶段的特性，WHATWG/W3C 新特性等。**它是一个现代化前端项目的“标准套件”**

2，**宏观上的设计，体现了工程复用能力**

## 问答

1，什么是 polyfill（垫片/补丁）？

> A polyfill, or polyfiller, is a piece of code (or plugin) that provides the technology that you, thedeveloper, expect the browser to provide natively. Flattening the API landscape if you will.

简单来说，polyfill 就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性

2，如何能在⼯程中，寻找并设计⼀个“最完美”的 polyfill ⽅案呢？

**完美定义：侵入性最小，工程化，自动化程度最高，业务影响最低**

- 手动打补丁，这种⽅式最为简单直接，也能天然做到“按需打补丁”，但是这不是⼀种⼯程化的解决⽅式，⽅案原始⽽难以维护，同时对于 polyfill 的实现要求较⾼

3，core-js 和 Babel ⽣态绑定在⼀起，它们到底有什么联系，如何实现密切配合？

4，core-js 如何和 @babel/preset-env + useBuiltins（usage）配合，并利⽤ AST 技术，实现代码级别的按需引⼊？

## 知识点

## 小结
