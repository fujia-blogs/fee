# babel 梳理

1，babel 是一个工具链(toolchain)，是前端基建中绝对重要的一环

## 要点

1，babel 的职责半径越来越大，需要完成下面内容：

- 语法转化，一般是高级语言特性的降级
- polyfill(垫片/补丁)特性的实现和接入
- 源码转换，如 jsx 等

### 理念

> 在工程化的角度，需要秉承的理念：

1，可插拔(pluggable)，需要一套灵活的插件机制，**召集第三方开发者力量**，同时还需要⽅便接⼊各种⼯具；

2，可调式(debuggable)，如 Babel 在编译过程中，要提供⼀套 Source Map，来帮助使⽤者在编译结果和编译前源码之间建⽴映射关系，⽅便调试；

3，基于协定(compact)，主要是指实现灵活的配置方式

4，**编译是 babel 的核心目标**，它自身的实现基于编译原理，深入 AST(抽象语法树)来生成目标代码

- Babel 需要⼯程化协作，需要和各种⼯具（如 Webpack）相互配合

5，babel 是一个使用 lerna 构建的 monorepo 风格的仓库

### babel 的包

1，@babel/parser，它是 Babel ⽤来对 JavaScript 语⾔解析的解析器

- @babel/parser 的实现主要依赖并参考了 acorn 和 acorn-jsx

2，@babel/preset-env 是直接暴露给开发者在业务中运用的包能力

3，@babel/preset-env 通过 targets 参数，按照 browserslist 规范，结 合 core-js-compat，筛选出适配环境所需的 polyfills（或 plugins）

4，@babel/plugin-transform-runtime，它可以重复使⽤ Babel 注⼊的 helpers 函数，达到节省代码⼤⼩的⽬的。

5，@babel/runtime 含有 Babel 编译所需的⼀些运⾏时 helpers 函数，供业务代码引⼊模块化的 Babel helpers 函数，同时它提供了 regenerator-runtime，对 generator 和 async 函数进⾏编译降级。

### babel 其它成员

1，@babel/plugin 是 Babel 插件集合

2，@babel/plugin-syntax-\* 是 Babel 的语法插件

3，@babel/plugin-proposal-\* ⽤于编译转换在提议阶段的语⾔特性

4，@babel/plugin-transform-\* 是 Babel 的转换插件

### babel 工程生态架构设计和分层理念

1，babel 生态是内聚的，也是开发的

## 问答

1，babel ⼀个简单的编译器如何会成为影响前端项⽬的“⼤杀器”呢？

- 主要是前端语言特性和宿主(浏览器/node.js 等)环境高速发展，但**宿主环境对新语言特性的支持无法做到即时，而开发者有需要兼容各种宿主环境**，语言特性的降级成为刚需

- 前端框架“⾃定义 DSL”的⻛格越来越凸显，使得前端各种“姿势”的代码被编译为 JavaScript 的需求成为标配

## 知识点

1，babel 生态基本按照：辅助层 -> 基础层 -> 胶水层 -> 应用层

2，eslint 的解析工具只支持最终进入 ECMAScript 语言标准的特性

## 小结

1，@babel/plugin-transform-runtime 需要和 @babel/runtime 配合使⽤

2，@babel/plugin-transform-runtime ⽤于编译时，作为 devDependencies 使⽤

3，@babel/plugin-transform-runtime 将业务代码编译，引⽤ @babel/runtime 提供的 helpers，达到缩减编译产出体积的⽬的

4，@babel/runtime ⽤于运⾏时，作为 dependencies 使⽤。

5，@babel/plugin-transform-runtime 和 @babel/runtime 结合还有⼀个作⽤：它除了可以对产出代码瘦身以外，还能避免污染全局作⽤域

6，注意@babel/node 和 @babel/register，都是在运⾏时进⾏编译转换，因此运⾏时性能上会有影响。**在⽣产环境中，我们⼀般不直接使⽤**

7，babel 生态和前端工程中的各个环节都是打通开放的，可以一 babel-loader 的形式和 webpack 协作，也可以以@babel/eslint-parser 的方式和 eslint 合作

8，现代化的前端工程是一环扣一环的，作为工程链上的任意一环，**插件化能力，协作能力将是设计的重点和关键**
