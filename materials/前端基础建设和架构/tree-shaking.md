# Three Sharing

1，译为“摇树”，通常用于描述移除 JavaScript 上下文中未引用的代码

## 要点

### css 和 tree shaking

1，实现思路也很简单，CSS 的 Tree Shaking 要在样式表中，找出没有被应⽤到选择器样式，进⾏删除。实现如下：

- 遍历所有 CSS ⽂件的选择器
- 根据所有 CSS ⽂件的选择器，在 JavaScript 代码中进⾏选择器匹配
- 如果没有匹配到，则删除对应选择器的样式代码

## 问答

1，Tree Shaking 为什么要依赖 ESM 规范？

Tree shaking 是在编译时进行无用代码消除的，因此**需要在编译时确定依赖关系**，进而确定哪些代码是可以被“摇掉”，esm 具备以下特点：

- import 模块名只能是字符串常量
- import 一般只能在模块的最顶层出现
- import binding 是 immutable 的

2，在传统编译型语⾔中，⼀般由编译器将⽆⽤代码在 AST（抽象语法树）中删除，⽽前端 JavaScript 并没有正统“编译器”这个概念，那么 Tree Shaking 就需要在 **⼯程链中由⼯程⼯具完成**

3，什么是副作用模块，如何对副作用模块进行 Tree Shaking?

- tree shaking 并不能摇掉副作用模块
- 具有副作⽤的模块难以被 Tree Shaking 优化，即便开发者知道 window.memoize ⽅法是⽆副作⽤的

4，**如何设计一个兼顾 tree shaking 和易用性的公共库？**

- 以 ESM 的⽅式对外暴露代码，那么就很难直接兼容 CommonJS 规范，也就是说在 Node.js 环境中，使⽤者如果直接以 require ⽅式引⽤的话，就会得到报错。如果以 CommonJS 规范对外暴露代码，⼜不利于 Tree Shaking
- 如果想要⼀个 npm 包既能向外提供 ESM 规范的代码，⼜能向外提供 CommonJS 规范的代码，我们就只能**通过“协约”来定义清楚**。实际上，npm package.json 以及社区⼯程化规范，解决了这个问题

```json
{
  "name": "Library",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js"
}
```

- 标准 package.json 语法中，只有⼀个⼊⼝ main。作为公共库设计者，我们通过 main 来暴露 CommonJS 规范打包的代码 dist/index.cjs.js；在 Webpack 等构建⼯具中，⼜⽀持了 module⸺这个新的⼊⼝字段。因此，**module 并⾮ package.json 的标准字段，⽽是打包⼯具专⽤的字段**，⽤来指定符合 ESM 标准的⼊⼝⽂件

5，如何遍历所有 CSS ⽂件的选择器呢？

- Babel 依靠 AST 技术，完成了对 JavaScript 代码的遍历分析，⽽在样式世界中，PostCSS 就起到了 Babel 的作⽤。PostCSS 提供了⼀个解析器，它能够将 CSS 解析成 AST 抽象语法树，我们可以通过 PostCSS 插件对 CSS 对应的 AST 进⾏操作，达到 Tree Shaking 的⽬的
- webpack 插件： purgecss-webpack-plugin

6，Rollup 是如何实现 Tree Shaking 的呢？

## 知识点

1，commonjs 定义的模块化规范，只有在执行代码后，才能动态的确定依赖模块，因此不具备 Tree Shaking 的先天条件

2，为了解决“具有副作⽤的模块难以被 Tree Shaking 优化”这个问题，Webpack 给出了⾃⼰的⽅案

- package.json 的 sideEffects 属性来告诉工程化工具哪些模块具有副作用，剩余的模块就是没有副作用的，可以被 tree shaking 优化

3，对于 Webpack ⼯具，开发者可以在 module.rule 配置中声明副作⽤模块

4，Tree Shaking 友好的最佳实践

- 在业务代码中，设置最小化副作用范围，同时通过合理的配置，给工程化工具最多的副作用信息

5，下面情况是不利于 tree shaking

- 导出⼀个包含多项属性和⽅法的对象
- 导出⼀个包含多项属性和⽅法的 class
- 使⽤ export default 导出

6，webpack 中，Webpack 将会趋向保留整个默认导出对象/class（Webpack 和 Rollup 只处理函数和顶层的 import/export 变量，不能把没⽤到的类或对象内部的⽅法消除掉）

7，**推荐的原则是：原子化和颗粒化导出**

8，jest 是基于 node.js 开发的，运行在 node.js 环境，使用 jest 进行测试时，需要模块符合 commonjs 规范

9，**普遍做法是在第三⽅库打包构建时，参考 antd，⼀般都会构建出 lib/和 es/ 两个⽂件夹，并配置 package.json 的 main、module 字段即可**

### 前端工程生态和 tree shaking 实践

#### babel

1，如果使⽤ Babel 对代码进⾏编译，Babel 默认会将 ESM 编译为 CommonJS 模块规范

2，根据不同的环境，采用不同的 babel 配置

```js
module.exports = {
  production: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
    ],
  },
  test: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
        },
      ],
    ],
  },
};
```

3，transformIgnorePatterns 是 Jest 的⼀个配置项，默认值为 node_modules，它表示：node_modules 中的第三⽅模块代码，都不需要经过 babel-jest 编译

### webpack 和 tree shaking

1，Webpack4.0 以上版本在 mode 为 production 时，会⾃动开启 Tree Shaking 能⼒

- webpack 真正执行模块擦除，是依赖 TerserPlugin，UglifyJs 等压缩插件，Webpack 负责对模块进⾏分析和标记，⽽这些压缩插件负责根据标记结果，进⾏代码删除

### vue 和 tree shaking

1，在 Vue 2.0 版本中，Vue 对象会存在⼀些全局 API，如：Vue.nextTick，如果我们没有使⽤ Vue.nextTick ⽅法，那么 nextTick 这样的全局 API 就成了 dead code，且不容易被 Tree Shaking 掉

2，在 Vue 3 中，Vue 团队考虑了 Tree Shaking 兼容，进⾏了重构，**全局 API 需要通过原⽣ ES Module 的引⽤⽅式进⾏具名引⽤**

- vue3 中很多内置的组件以及工具都实现了具名导出，这些都是前端生态中，公共库拥抱 tree shaking 的表现

## 小结
