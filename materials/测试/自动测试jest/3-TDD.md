# TDD(Test Driven Development) - 测试驱动开发

1. TDD 开发流程(Red-Green Development)

- 编写测试用例
- 运行测试，测试用例无法通过测试
- 编写代码，使测试用例通过测试
- 优化代码，完成开发
- 重复上述步骤

2. 测试优势

- 长期减少回归 bug
- 代码质量更好(组织，可维护性)
- 测试覆盖率高
- 错误测试代码不容易出现

## jest 配置项

### react 项目

> 配置项在文件 jest.config.js

1. collectCoverageFrom - 指定代码覆盖率分析的来源文件夹

2. setupFiles - 运行测试用例前准备的工作，如：setupFiles: ['react-app-polyfill/jsdom'] 表示测试前加一些垫片，解决测试时的一些兼容问题。

3. setupFilesAfterEnv - 环境准备好了之后的执行钩子，如：setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']，表示环境准备好了之后，执行 setupTests.ts 文件

4. testMatch - 指定匹配的测试文件

5. testEnvironment - 指定测试运行的环境

6. transform - 指定特定文件的转义器

- **前端自动化测试时，基本不会对样式进行测试，如果引入了样式文件，会使用空对象代替，避免对样式的处理**

7. transformIgnorePatterns - 指定需要忽略的转换文件(夹)

8. modulePaths - 表示自动化测试时，指定额外的模块查找文件。

9. moduleNameMapper - 对指定的模块进行处理，见示例：

```ts
module.exports = {
  '^react-native$': 'react-native-web',
  '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
};
```

以 scss 文件的规则来说明：

- identity-obj-proxy - 是一个第三方模块
- 将样式文件转化成一个对象，key-value 均为均为对应的类名

10. moduleFileExtensions - 指定模块的后缀名。

11. watchPlugins - 运行测试时，执行的插件

## 使用 Enzyme

## 测试实践

1. 在单元测试时，面向数据的测试相对简单；在集成测试中，推荐测试 DOM 的展示。

### 快照测试

1. 当组件的样式不再发生频繁改变时，可以使用 toMatchSnapshot()添加快照测试，阻止后面随意的更改 UI。

### CodeCoverage - 代码覆盖率

1. 配置

```json
// package.json
{
  "scripts": "node scripts/test.js --coverage --watchAll=false"
}
```

## 要点

1. TDD 的优势

- 提高代码质量

2. 单元测试的优势：

- 测试覆盖率高

3. 单元测试的缺点：

- 业务耦合度高
- 代码量大
- 过于独立
