# Nginx

> 官网：http://nginx.org/en/docs/

1，提供静态服务(如：CDN，统计服务)，Nginx 是无二的选择

2，核心价值

- 高性能的静态服务
- 反向代理
- 负载均衡

## Nginx 安装和配置

### 安装

### 使用

1，常用命令

- nginx -t:测试配置文件的语法
- nginx: 启动
- nginx -s reload: 重启
- nginx -s stop: 停止
- nginx -c xxx.conf：修改配置文件的位置

**Note: 使用 centOS 系统，需要使用 root 权限(su 或 sudo)执行 nginx 命令**

### 基本配置

```conf
http {
  include           mime.types;
  default_type      application/octet-stream;

  log_format        main      '$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" "$http_x_forwarded_for"';

  access_log        logs/access.log       main;
  error_log         logs/error.log;

  # one service
  server {
    listen          8086;
    server_name     event_analytics;
    access_log      /xxxx/nginx_logs/event_analytics/access.log  main;
    error_log       /xxxx/nginx_logs/event_analytics/error.log;
    root            /xxxx/code/event-analytics-server/nginx_files; # some static files
  }

  # another service
  server {
    listen          8087;
    server_name     another_server;
    root            /xxxx/xxx;
    # There is no need to define fields of access_log and error_log, it use above configurations by default
  }
}
```

#### include

1，nginx 配置文件只有一个，且目录一般固定(可以通过 nginx -c xxx.conf 配置)，当服务较多时，将配置拆分开，通过 include 组合在一起，更加便于扩展

```conf
http {
  server {
    listen      8088;
    server_name 'xxx';
    root          /xxx/xxx; # static files
  }

  # include other configurations
  include /xxxx/nginx_conf/dev/*;
  include /xxx/xxx/*;
}

# /xxxx/nginx_conf/dev/event.conf 目录下的配置
server {
  listen      8080;
  server_name   'xxxx';
  access_log     xxx/xxx;
  error_log      xxx/xxx;
  root           xxxx/;
}
```

## access_log 日志拆分

1，access.log 日志默认不会拆分，会越积累越多，大文件不易操作

2，离线分析日志、计算统计结果

### 如何拆分？

1，根据流量大小，按天、小时、分来拆分

示例：

按天拆分到一个文件中

```conf
logs_by_day/access.2022-02-14.log
logs_by_day/access.2022-02-15.log
```

2，技术实现

- nginx 持续写入 access.log
- 启动定时任务，在凌晨 00:00，将当前 access.log 复制一份，并重新命名 access.2011-02-14.log
- 清空当前 access.log

### 定时任务

1，通用的定时表达式规则

|     second     | minute | hour | day of month | month |    day of week     |
| :------------: | :----: | :--: | :----------: | :---: | :----------------: |
|       \*       |   \*   |  \*  |      \*      |  \*   |         \*         |
| 0-59(optional) |  0-59  | 0-23 |     1-31     | 1-12  | 0-7(0 or 7 is Sun) |

- linux crontab 不支持秒

2，添加一个定时任务

```sh
# 添加一个定时任务
crontab -e
# 查看定时任务
crontab -l
# 编辑，直接删除对应定时任务
crontab -e
```

## 定时清理历史日志文件
