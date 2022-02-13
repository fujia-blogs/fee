# ejs和glob的使用

1，会打开视野，扩展思路

## ejs

1，使用

```js
let template = ejs.compile(str, options);

// 输出渲染后的HTML字符串
template(data);

// 输出渲染后的HTML字符串
ejs.render(str, data, options)

ejs.renderFile(fileName, data, options, function(err, str) {
  // str: 输出渲染后的HTML字符串
})
```

- ejs.compile是一个耗性能的操作
- ejs.compile和ejs.render的区别是：是否缓存template，即需要对template反复使用

2，标签的含义

- <% : '脚本'标签，用于流程控制，无输出
- <%_ : 删除其前面的空格符
- <%= : 输出数据到模板(输出的是转义HTML标签)
- <%- : 输出非转义的数据到模板
- <%# : 注释标签，不执行，不输出内容
- <%% : 输出字符串 '<%'`
- %>  : 一般结束标签
- -%> : 删除紧随其后的换行符
- _%> : 将结束标签后面的空格符删除

### 其它功能

1，包含

```js
<%- include('header', { header: 'header' }); -%>

<%- include('footer', { footer: 'footer' }); -%>
```

2，自定义分隔符

3，自定义文件加载器

## glob

