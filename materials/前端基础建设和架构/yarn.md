# yarn 的安装理念及如何破解依赖管理困境

1，不管是那种工具，应该全面了解其思想和优劣，真正驾驭它，为自己的项目架构服务

2，yarn 的理念

- 确定性：通过 yarn.lock 等机制，保证了确定性
- 采用模块扁平安装模式
- 将依赖包的不同版本，按照⼀定策略，归结为单个版本，以避免创建多个副本造成冗余（npm ⽬前也有相同的优化）
- 网络性能更好，采用缓存机制，实现了离线模式

3，**相比 npm，yarn 另一个显著区别是 yarn.lock 中子依赖版本号不是固定版本**，说明单独⼀个 yarn.lock 确定不了 node_modules ⽬录结构，还需要和 package.json ⽂件进⾏配合

4，yarn 默认使用 prefer-online 模式，即优先使用网络数据。如果⽹络数据请求失败，再去请求缓存数据

5，如果 prefer-online 关闭了， 那么会查找对应缓存，Yarn 会根据 cacheFolder+slug+node_modules+pkg.name ⽣成⼀个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不⽤重新下载。这个 path 也就是依赖包缓存的具体路径

6，yarn 对没有命中缓存的包，**维护一个 fetch 队列，按照规则进行网络请求**

- 最终结果使用 fs.createWriteStream 写入到缓存目录

7，**扁平化原则是核心原则**

8，模块的安装顺序可能影响 node_modules 内的文件结构

**npm 包的安装顺序对于依赖树的影响很大，模块安装顺序可能影响 node_modules 内的文件数量**

9，包安装不只是从远程下载文件那么简单，其中涉及缓存，系统文件路径，更重要的是还涉及安装依赖树的解析，安装结构算法等

## 命令

1，查看缓存

```sh
yarn cache dir
```

2，yarn 独有的命令(vs: npm)

```sh
yarn import
yarn licenses
yarn pack
yarn why
yarn autoclean

# npm only
npm rebuild
```

## yarn 的安装理念

### yarn 安装流程图

1，checking：检测包

- 检测项目中是否存在一些 npm 相关文件，如：package-lock.json

2，Resolving Packages：解析包

- 获取当前项⽬中 package.json 定义的 dependencies、devDependencies、optionalDependencies 的内容，这属于⾸层依赖
- 采⽤遍历⾸层依赖的⽅式获取依赖包的版本信息，以及递归查找每个依赖下嵌套依赖的版本信息，并将解析过和正在解析的包⽤⼀个 Set 数据结构来存储，这样就能保证同⼀个版本范围内的包不会被重复解析
- 经过解析包这⼀步之后，我们就确定了所有依赖的具体版本信息以及下载地址

3，Fetching Packages：获取包

4，Linking Packages: 链接包

- 是将项⽬中的依赖复制到项⽬ node_modules 下，同时遵循扁平化原则。在复制依赖前，Yarn 会先解析 peerDependencies，如果找不到符合 peerDependencies 的包，则进⾏ warning 提示，并最终拷⻉依赖到项⽬中

5，Building Packages: 构建包

- 如果依赖包中存在二进制包需要进行编译，在这一步进行

## 破解依赖管理困境

1，yarn 在安装依赖时会自动执行 dedupe 命令，整个优化的安装过程，即扁平化安装模式

- npm 也可以使用"npm dedupe"命令
