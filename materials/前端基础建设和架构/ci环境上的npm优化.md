# ci 环境上额 npm 优化

## 要点

1，ci 环境下的 npm 配置和开发者本地 npm 操作有些不同

2，ci 环境上，缓存 node_modules 文件是企业级使用包管理工具常用的优化做法

3，事实上，并不是所有的⼦依赖都有 dependencies 属性，只有⼦依赖的依赖和当前已安装在根⽬录的 node_modules 中的依赖冲突之后，才会有这个属性

### package-lock.json 详细说明

1，早期 npm 锁定版本的⽅式是使⽤ npm-shrinkwrap.json，它与 package-lock.json 不同点在于：npm 包发布的时候默认将 npm-shrinkwrap.json 发布，因此类库或者组件需要慎重

2，使⽤ package-lock.json 是 npm v5.x 版本新增特性，⽽ npm v5.6 以上才逐步稳定，在 5.0 - 5.6 中间，对 package-lock.json 的处理逻辑进⾏过⼏次更新

3，在 npm v5.0.x 版本中，npm install 时都会根据 package-lock.json ⽂件下载，不管 package.json 内容究竟是什么

4，npm v5.1.0 版本到 npm v5.4.2，npm install 会⽆视 package-lock.json ⽂件，会去下载最新的 npm 包并且更新 package-lock.json

5， npm 5.4.2 版本后：

- 如果项⽬中只有 package.json ⽂件，npm install 之后，会根据它⽣成⼀个 package-lock.json ⽂件
- 如果项⽬中存在 package.json 和 package-lock.json ⽂件，同时 package.json 的 semver-range 版本和 package-lock.json 中版本兼容，即使此时有新的适⽤版本，npm install 还是会根据 package-lock.json 下载
- 如果项⽬中存在 package.json 和 package-lock.json ⽂件，同时 package.json 的 semver-range 版本和 package-lock.json 中版本不兼容，npm install 时 package-lock.json 将会更新到兼容 package.json 的版本
- 如果 package-lock.json 和 npm-shrinkwrap.json 同时存在于项⽬根⽬录，package-lock.json 将会被忽略

### 版本规范 - 依赖库锁版本行为解析

1，工程建设的细节点 - 依赖库锁版本行为

## 问答

1，为什么要 lockfiles？

- npm v5 增加了 package-lock.json 文件
- 道 package-lock.json ⽂件的作⽤是锁定依赖安装结构，⽬的是保证在任意机器上执⾏ npm install 都会得到完全相同的 node_modules 安装结果

2，为什么单一的 package.json 不能确定唯一的依赖树？

- 不同的版本的 npm 的安装依赖策略和算法不同
- npm install 将根据 package.json 中的 semver-range version 更新依赖，某些依赖项⾃上次安装以来，可能已发布了新版本

3，npm 项目中要不要提交 lockfile 到仓库？

- 如果开发⼀个应⽤，建议把 package-lock.json ⽂件提交到代码版本仓库。这样可以保证项⽬组成员、运维部署成员或者 CI 系统，在执⾏ npm install 后，能得到完全⼀致的依赖安装内容
- 如果你的⽬标是开发⼀个给外部使⽤的库，那就要谨慎考虑了，因为库项⽬⼀般是被其他项⽬依赖的，在不使⽤ package-lock.json 的情况下，就可以复⽤主项⽬已经加载过的包，减少依赖重复和体积
- 如果我们开发的库依赖了⼀个精确版本号的模块，那么提交 lockfiles 到仓库可能会造成同⼀个依赖不同版本都被下载的情况。如果作为库开发者，真的有使⽤某个特定版本依赖的需要，⼀个更好的⽅式是定义 peerDependencies

4，为什么有 xxxDependencies？

5，作为库开发者，如果保证依赖包之间的强制最低版本要求？

## 知识点

1，在 ci 环境使用 npm ci 代替 npm install 一般会获得更加稳定，一致和迅速的安装体验

2，使用 package-lock.json 优化安装时间

- 对于应用项目，建议上传 package-lock.json 到仓库中，以保证依赖安装的⼀致性
- 事实上，如果项⽬中使⽤了 package-lock.json ⼀般还可以显著加速依赖安装时间。这是因为 package-lock.json 中已经缓存了每个包的具体版本和下载链接，你不需要再去远程仓库进⾏查询，即可直接进⼊⽂件完整性校验环节，减少了⼤量⽹络请求

3，npm 项目中 lockfiles 出现的原因：**保证能够完整准确地还原项目依赖**

4，推荐：把 package-lock.json 一起提交到代码库中，不需要 ignore，但是执行 npm publish 命令，发布一个库时，它应该被忽略而不是直接发布出去

5，[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)

## 小结
