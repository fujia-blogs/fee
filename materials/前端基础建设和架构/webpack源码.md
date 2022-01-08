# webpack

> webpack is a static module bundler for modern javascript applications

1，从本质来说，webpack 实质就是一个“前端模块打包器”，他做的事情很简单：帮助开发者将 JavaScript 模块(各种类型的模块化规范)打包为一个或多个 JavaScript 脚本文件

## 问答

1，前端为什么需要一个模块打包器?

- 不是所有浏览器都直接⽀持 JavaScript 规范；
- 前端需要管理依赖脚本，把控不同脚本加载的顺序；
- 前端需要按顺序加载不同类型的静态资源

2，在 Rollup 处理理念下，如果模块出现了循环依赖，会发⽣什么现象呢？

## 要点

1，打包器的需求是前端“刚需”，实现打包需求需要考虑：

- 如何维护不同脚本的打包顺序，保证 bundle.js 的可⽤性
- 如何避免不同脚本、不同模块的命名冲突
- 在打包过程中，如何确定真正需要的脚本，⽽不将没有⽤到的脚本排除在 bundle.js 之外？

2，Webpack 依靠 loader 机制实现了对于不同类型资源的解析和打包，依靠插件机制实现了第三⽅介⼊编译构建的过程

3，webpack 风格的打包器原理和流程：

[Webpack 打包器原理和流程图](./assets/webpack-schematic-flows.jpg)

### 实现一个打包器(向 webpack 打包设计对齐)

1，核心思路：

- 读取⼊⼝⽂件（⽐如 entry.js）；
- 基于 AST 分析⼊⼝⽂件，并产出依赖列表；
- 使⽤ Babel 将相关模块编译到 ES5；
- 对每个依赖模块产出⼀个唯⼀的 ID，⽅便后续读取模块相关内容；
- 将每个依赖以及经过 Babel 编译过后的内容，存储在⼀个对象中进⾏维护；
- 遍历上⼀步中的对象，构建出⼀个依赖图（Dependency Graph）；
- 将各模块内容 bundle 产出。

2，创建一个项目：

```sh
mkdir builder-playground;cd $_
```

## 知识点

1，注意：

- 随着 HTTP/2 技术的推⼴，未来⻓远上看，浏览器像上述代码⼀样发送多个请求不再是性能瓶颈，但⽬前来看还过于乐观
- 并不是将所有脚本都打包在⼀起就是性能最优

2，Rollup 的原理思想与 webpack 不同：Rollup 不会维护一个 module map，而是将所有模块拍平(flatten)放到 bundle 中，也就不存在包裹函数（module factory function）

3，Webpack 和 Rollup 的打包⽅式进⾏对⽐：

webpack 理念：

- 使⽤了 module map，维护项⽬中的依赖关系
- 使⽤了包裹函数，对每个模块进⾏包裹
- 使⽤了⼀个“runtime”⽅法），最终合成 bundle 内容

Rollup 理念：

- 将每个模块拍平
- 不使⽤包裹函数，不需要对每个模块进⾏包裹

## 小结
