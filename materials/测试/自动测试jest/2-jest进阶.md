# jest 进阶

## snapshot 快照测试

1. toMatchSnapshot()，会在本地生成一个快照文件

2. 应用场景：

- 测试配置文件，修改配置文件之后会导致测试通不过

3. expect.any(Number | Date)表示值是某一个类型即可。

### 行内 snapshot

1. 安装 prettier

2. 行内 snapshot 会把快照放到测试用例中。

## mock

1. 在根目录下创建一个\_\_mocks\_\_的文件夹，创建相应的要测试的文件，模拟对应的函数实现。

在测试文件中，使用下面的语法测试模拟 mock 文件的函数：

```ts
// 真实的实现
import { fetchData } from './demo';

// mock的实现文件
jest.mock('./demo');
```

如果 mock 的模块中的部分函数需要使用真实的实现，可以使用下面的方法引入：

```ts
const { fetchArticles } = jest.requireActual('./demo');
```

2. 在 jest.config.ts 设置自动启用 mock

```ts
export default {
  automock: true,
};
```

### Mock Timers

1. jest.useFakeTimers 和 jest.runAllTimers，在测试用例中，遇到 setTimeout 或 setInterval 等函数时，都使用假的 timer 来模拟。

2. jest.useFakeTimers 和 jest.runAllTimers 需要一起使用。

3. 使用 jest.useFaceTimers 的好处是：可以避免异步执行时等待的时间。

4. jest.runOnlyPendingTimers()，仅运行处于队列中的 timer。

## 类的测试

1. 进一步理解「单元测试」，即测试时只关注当前单元的功能代码，对外部引入的模块并不关心，**需要注意的是：**如果外部引入的模块执行是耗性能的，**需要对引入的模块进行 mock**，从而保证当前的单元测试快速的被执行。

**注意：单元测试中引入 mock 的一个重要作用是使得单元测试变得简单，运行速度变得更快。**

2. 在单元测试中，通常会使用各种各样的 mock 来提升单元测试的性能。

3. **集成测试，**在一个模块中将测试当前模块所有引入到模块进行测试。

4. 也可以自定义模拟一个模块。

### 类的模拟

1. 示例：

```ts
// Util.ts
export default class Util {
  constructor(public index = 0) {}

  add() {
    this.index += 1;
  }
}

// demo.test.ts
jest.mock('./Util');
```

**使用 jest.mock 模拟一个模块时**，如果模块是一个类，jest 会自动把类的构造函数和方法构建成 jest.fn()，此时，Util 类不是真实的类。

## dom 结点操作

1. jest 在 node 环境模拟了一套 DOM 的 API，即 js-dom。
