# webpack

## 流程分解

> 完整的构建流程

1. 基本流程：

1.1 创建编译器 Compiler 实例。

1.2 根据 webpack 参数加载参数中的插件和程序内置插件

1.3 **执行编译流程：**创建编译过程 Compilation 实例，从入口递归添加与构建模块，模块构建完成后冻结模块，并进行优化。

1.4 构建与优化结束后提交产物，将产物内容写到输出文件中。

### 具体实现

1. 运行方式：

- 基于命令行的方式

```sh
webpack --config webpack.config.js
```

- 基于代码的方式

```js
const webpack = require('webpack');
const config = require('./webpack.config');

webpack(config, (err, stats) => {});
```

2. 核心流程的源码分析

```js
const webpack = (options, callback) => {
  options = {
    // 处理options默认值
  };

  let compiler = new Compiler(options.context);
  // 处理参数中的插件等
  compiler.options = new WebpackOptionsApply().process(options, compiler);
  // 分析参数，加载内部插件
  if (callback) {
    // ...
    compiler.run(callback);
  }

  return compiler;
};
```

3. Compiler.js 的基本流程

- readRecords - 读取构建记录，用于分包缓存优化，在未设置 recordsPath 时直接返回

### Compilation.js 基本流程

## 生命周期

1. Compiler 和 Compilation 都扩展自 Tapable 类，用于实现工作流程中的生命周期划分，其中所暴露出来的生命周期节点称为**Hook(钩子)**

## 插件

1. 示例：

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('HelloWorldPlugin', (compilation) => {
      console.log('Hello World');
    });
  }
}

module.exports = HelloWorldPlugin;
```

## Hook 的使用

1. 4 个步骤：

- 定义 hook
- 在插件中注册 hook
- 生成插件实例，运行 apply 方法
- 调用 hook

### Compiler Hooks

1. 构建器实例的生命周期

- 初始化阶段
- 构建过程阶段
- 产物生成阶段
