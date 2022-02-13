# node多进程开发

1，node多进程的核心就是创建一个子进程，这个子进程会依附在当前进程的下面，node多进程开发中，核心中用到的类是ChildProcess

2，什么是进程

> 进程(process)是计算机的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位， 是操作系统结构的基础

两个主要的概念：

- 进程是一个实体，每个进程都有自己的地址空间
- 进程是一个“执行中的程序”，存在嵌套关系

node.js中不需要操作线程，只能操作进程

**通过子进程获取更多的操作系统资源**

3，**在child_process中创建的进程都是node.js的子进程**

4，查看系统中的所有进程： ps -ef / ps -ef|grep node

- /sbin/launched(pid: 1) - 对应的是桌面应用程序

## child_process

1，异步

- exec
- execFile
- fork
- spawn

2，同步

- execSync
- execFileSync
- spawnSync

### exec

- exec本质就是execFile

1，主要用来执行shell脚本，shell脚本与普通命令相比，可以是一个连续的语句


### execFile

1，主要是用来执行文件的

### spawn

> exec, execFile, fork底层都是使用的spawn

1，返回的是子进程

2，spawn是通过“流”的方式不断接收进程传递过来的数据

### fork

1，用来创建一个子进程，这个子进程使用node来执行

2，fork会启动两个进程，一个主进程，一个子进程

3，fork返回的是一个子进程对象

### 方式选择

1，spawn - 适用于耗时任务，如：npm install，需要不断的打印日志

2，exec/execFile/fork - 适应于开销较小的任务，它会在任务一次执行完之后再返回结果

3，fork - 适应于一些耗时操作，而且这些耗时操作是使用node实现的，如：下载文件，甚至基于fork可以实现多进程下载文件

4，execSync - 适用于一些简单命令

- 对脚本的安全性没有校验
- 从安全角度考虑，可以使用execFileSync

### 实践

1，fork方法不提供回调，需要通过子进程的通信来处理，这种方式不是特别推荐

2，比较推荐的方式是spawn，注意不要用spawnSync，因为在执行的过程中可能会有很多交互，需要不断的接收数据并打印

## 参考文档

1，[官网 - child_process](http://nodejs.cn/api/child_process.html)