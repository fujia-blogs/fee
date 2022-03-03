# 自动化测试

1. 测试的种类：

- 单元测试
- 集成测试
- E2E
- 回归测试
- 性能测试
- 压力测试

2. 单元测试，就是对一个独立的功能单元简单测试。

3. 集成测试，简单理解是多个功能单元(模块)测试。

## 背景

## 原理

## jest 配置

1.

## jest 匹配器

1. toBe 类似于 Object.is

2. toEqual：内容相等

3. toBeCloseTo：浮点数匹配。

4. toMatch：字符串匹配。

5. toThrow：抛出异常匹配。

6. 编写测试用例时，使用不同的匹配器可以实现不同的效果。

## jest 命令

1. jest 的 o 模式需要配合 git 一起使用。

2. "jest --watch"表示直接进入 o 模式。

## 异步代码

1. expect.assertion(1)，表示：必须执行一次 expect，且值为 true。

2. 测试 promise 的异步函数时，测试 catch 分支时，需要注意的是：catch 分支可能走不到，需要在前面加一个 expect.assertions()

## 钩子函数

1. beforeAll

2. afterAll

3. beforeEach

4. afterEach

### 作用域

1. describe 下面的钩子函数对下面的所有测试用例都有效

2. 使用 test.only 语法测试单个测试用例

3. describe 中的内容会优先执行。

## mock

1. mock 函数，fn.mock 中包含：

- 捕获函数的调用，返回结果，this 和调用顺序
- 设置返回结果 - fn.mockReturnValue('')
- 改变函数的内部实现。

2. 在实际应用中，测试异步请求时，不会发送真实的异步请求

**对前端来说，测试异步请求，只需要测试异步请求是否发送，不需要测试返回的内容，这是后端自动化测试的内容**

3. typescript 中，mock axios 示例：

```ts
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
```
