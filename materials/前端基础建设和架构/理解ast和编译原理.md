# 理解 AST 和编译原理

1，AST 技术是现代化前端基建和工程化建设的基石

- Babel、Webpack、ESLint、代码压缩⼯具等⽿熟能详的⼯程化基建⼯具或流程，都离不开 AST 技术
- Vue、React 等经典前端框架，也离不开基于 AST 技术的编译

## 要点

### acorn

> A tiny, fast javascript parser, written completely in javascript

1， 社区上多项著名项⽬都依赖的 acorn 的能⼒（⽐如 ESLint、Babel、Vue.js 等）

2，语法解析器的实现流程：

**Source code -> 词法分析(tokenizer) -> 分词结果(token 序列[token, token]) -> 语法分析 -> AST**

3，acorn 有些不同：acorn 将词法分析和语法分析交替进行，只需要扫描一遍代码即可得到最终 AST 结果

4，在分词过程中，实现者往往使用一个 Context 来表达一个上下文，实际上 context 是一个栈数据结构

5，acorn 在语法解析阶段主要完成 AST 的封装以及错误抛出，需要了解一段源代码可以用下面三部分来描述：

- program - 整个程序
- statement - 语句
- expression - 表达式

6，Program 包含了多段 Statement，Statement ⼜由多个 Expression 或者 Statement 组成。这三种⼤元素，就构成了遵循 ESTree 规范的 AST。最终的 AST 产出，也是这三种元素的数据结构拼合

## 问答

## 知识点

## 小结

1，平台： [AST explorer](https://astexplorer.net/)

2，acorn：[github](https://github.com/acornjs/acorn)

3，当前前端基础建设，工程化建设越来越离不开 AST 技术得支持，AST 在前端中扮演的重要角色越来越广为人知

4，**AST 是计算机领域中一个经历多年的基础概念，每一名开发者都应该循序渐地了解 AST 相关技术和编译原理**

5，**前端基建和工程化是一张网，网上的每一个技术点，都能由点及面，绘制出一张前端知识图谱**
