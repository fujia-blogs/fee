# npm scripts 打造一体化的构建和部署流程

1，一个顺畅的基建流程离不开 npm scripts, npm scripts 将工程化的各个环节串联起来，任何⼀个现代化的项⽬都有⾃⼰的 npm scripts 设计

## 问答

1，如何设计并实现项目配套的 npm scripts?

2，关于 npm scripts 我们如何进⾏封装抽象，做到复⽤或基建统⼀呢？

3，npm run 创建出来的 Shell 有什么特别之处呢？

npm run 创建出来的 Shell 需要将当前⽬录的 node_modules/.bin ⼦⽬录加⼊ PATH 变量中，在 npm scripts 执⾏完成后，再将 PATH 变量恢复

## 要点

### npm scripts 是什么

1，在项⽬中可以使⽤命令⾏执⾏相关的脚本：

```sh
npm run build

npm run dev

npm test
```

其中 build.js、dev.js、test.js 三个 Node.js 模块分别对应上⾯三个命令⾏执⾏命令。这样的设计，可以⽅便我们统计和集中维护项⽬⼯程化或基建相关的所有脚本/命令，也可以利⽤ npm 很多辅助功能

2，使⽤ npm 钩⼦，⽐如 pre、post，对应命令 npm run build 的钩⼦命令就是：prebuild 和 postbuild

3，使⽤ npm 提供的 process.env.npm_lifecycle_event 等环境变量。通过
process.env.npm_lifecycle_event，可以在相关 npm scripts 脚本中获得当前运⾏的脚本名称

4，**使⽤ npm 提供的 npm*package*能⼒，获取 package.json 中的相关字段**

### npm scripts 原理

1，执⾏⼀个 npm scripts，那么核⼼奥秘就在于 npm run 了。npm run 会⾃动创建⼀个 Shell（实际使⽤的 Shell 会根据系统平台⽽不同，类 UNIX 系统⾥，如 macOS 或 Linux 中指代的是 /bin/sh， 在 Windows 中使⽤的是 cmd.exe），我们的 npm scripts 脚本就在这个新创建的 Shell 中被运⾏。

2，结论

- 只要是 Shell 可以运⾏的命令，都可以作为 npm scripts 脚本；
- npm 脚本的退出码，也⾃然遵守 Shell 脚本规则；
- 如果我们的系统⾥安装了 Python，可以将 Python 脚本作为 npm scripts；
- npm scripts 脚本可以使⽤ Shell 通配符等常规能⼒。

### npm scripts 使用技巧

1，传递参数，在 npm scripts 中，可以使⽤--标记参数

2，串⾏/并⾏执⾏脚本

- 使用&& 符号串行执行脚本
- 使用&并行执行脚本

3，npm scripts 可以和 git-hooks 相结合，为项⽬提供更顺畅、⾃然的能⼒。⽐如 pre-commit、husky、lint-staged 这类⼯具，⽀持 Git Hooks 各种种类，在必要的 git 操作节点，执⾏我们的 npm scripts

### 打造一个 fujia-scripts

1，⼀个 npm scripts 插件集合，通过 Monorepo ⻛格的项⽬，借助 npm 抽象“⾃⼰常⽤的”npm scripts 脚本，以在多个项⽬中达到复⽤的⽬的

2，设计思想其实源于 Kent C.Dodds（https://kentcdodds.com/blog）的：Tools without config 思想

3，对于一个企业级团队来说，**维护统一的企业级工具配置或设计**，对工程效率的提升至关重要，这些工具有：

- 测试工具及方案
- client 端打包工具及方案
- linting 工具及方案
- babel 工具及方案

这些⼯具及⽅案的背后往往是烦琐的配置，同时，这些配置的设计却⾄关重要

4，fujia-scripts 负责维护和掌管⼯程基建中的种种⼯具及⽅案，同时它的使命不仅仅是 Bootstrap ⼀个项⽬，⽽是⻓期维护基建⽅案，可以随时升级，随时插拔。

- 类似熟悉的 create-react-app，开发者只需要使⽤ react-scripts 就能够满⾜构建和测试等需求，开发者只需要关⼼业务开发

5，fujia-scripts 的理念相同：开发者只需要使⽤ fujia-scripts 就可以使⽤开箱即⽤的各类型 npm scripts 插件，npm scripts 插件提供基础⼯具的配置和⽅案设计

6，如何做到开发者⾃定义配置的能⼒呢？

设计上，**⽀持开发者在项⽬中添加.babelrc 或在项⽬的 package.json 中添加相应的 babel 配置项**，fujia-scripts 在运⾏时读取这些信息，并采⽤开发者⾃定义的配置即可。

```json
{
  "babel": {
    "presets": ["fujia-scripts/babel"],
    "plugins": ["glamorous-displayname"]
  }
}
```

## 知识点

1，通配符：\*表示任意⽂件名，\*\*表示任意⼀层⼦⽬录

2，编写的 npm scripts 应该考虑不同操作系统上兼容性的问题

3，npm scripts 就是一个 shell

## 小结

1，[npm-run-all](https://github.com/mysticatea/npm-run-all)

2，[un-script-os ](https://www.npmjs.com/package/run-script-os)
