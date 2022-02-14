# 阿里云ECS配置Nginx

## 安装nginx

1，使用 sudo apt-get install nginx, 使用nginx -v确认安装正确

2，多域名nginx配置

进入/ect/nginx/conf.d目录下，新建域名对应的配置文件，相关内容如下：

```shell

upstream pythonFujiaSite {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name pyhton.fujia.site;
  return 301 https://python.fujia.site$request_uri;
}

server {
  listen 443;
  server_name python.fujia.site;  # 绑定证书的域名
  ssl on;
  ssl_certificate /www/ssl/1_python.fujia.site_bundle.crt;
  ssl_certificate_key /www/ssl/2_python.fujia.site.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配
置
  ssl_prefer_server_ciphers on;

  # 访问协议为空
  if ($ssl_protocol = "") {
    rewrite ^(.*) https://$host$1 permanent;
  }

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://pythonFujiaSite;
    proxy_redirect off;
  }
}

```

在/etc/nginx目录下， 打开nginx.conf文件， 确认`include /etc/nginx/conf.d/*.conf;`这一行没有被注释， 它表示会加载/etc/nginx/conf.d目录下所有.conf文件

使用sudo nginx -t命令测试配置文件语法是否正确

3，隐藏nginx版本信息

打开文件 /etc/nginx/nginx.conf, 去掉 `# server_tokens off;`前面的#号

4，使用sudo service nginx reload重载配置文件

