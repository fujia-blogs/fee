# git-flow

## Git Flow主流程

1，远程仓库

分支类型：

- main：表示的是最新的线上源码

> 源码没上线，就不应该拉去main源码

- release：记录每次的发布

- develop：当前正在开发的分支集合

**发布的时候，根据develop分支发布到线上**

2，fork/clone 到本地

分支类型

- main

- feature/hotfix

> feature: 功能开发
> hotfix: bug修复

**上线之后，远程main分支是最新的，release上有一个发布tag版本，本地仓库main分支与远程main分支同步，其它分支都被删除**