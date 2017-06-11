+++
categories = ["tuts"]
date = "2017-06-11T23:15:57+08:00"
tags = ["ngrok", "centos"]
title = "如何自己架设一个ngrok服务端"
banner = "img/blog/2017/06/11/ngrok.png"
+++

## 前言

> 用过我MOD版的固件的都会发现, 在ngrok那里有两个程序可以切换,一个是ngrok-c, 另一个是ngrok-libev.
> 从实际使用来看, ngrok-libev 占用的资源更少,效率更高. 这也是我一直在使用的.
> 但是ngrok 官方源码是不支持 ngrok-libev 客户端的. 所以我得不能直接 yum install xxxx 来安装ngrok, 要自己编译.

本文以CentOS系统为例,其它Linux发行版也可参考.

首先你得有一个服务器或vps.
由于ngrok服务端实际上是一种代理的角色,因此,对于国内用户来说,
国内服务器的速度会优于国外的.

这里为什么git clone的是我mod版的ngrok?
mod版主要是修复了默认监听ipv6 IP的问题,
以及添加了对ngrok-libev 客户端的支持.

## 1. 编译安装ngrok

ssh登录进服务器:

```bash
cd /opt/
git clone https://github.com/ihacklog/ngrok.git
cd ngrok
chmod a+x gen-ssl.sh
#编辑gen-ssl.sh 把 YOUR-TUNEL-DOMAIN 换成你自己的域名,如 t.abc.com
vim gen-ssl.sh
#生成自签名ssl证书
./gen-ssl.sh
```

开始编译:
```bash
# 没有安装go的先安装一下go环境:
dnf install -y go
# 或 yum install -y go
make release-server release-client
# 如果不出意外,你应该可以看到编译好的文件, ls bin 看看
```

## 2. 安装并启动服务

CentOS 7用户看这里:

```bash
#如果是centos 7, 把systemd的服务文件copy到相应目录:
cp ngrokd.service /usr/lib/systemd/system
#编辑文件,把 YOUR-TUNEL-DOMAIN 更改为你自己的域名,如 t.abc.com
#如果需要调整,端口把默认的:80 和  :443 改成你想要的端口即可
vim /usr/lib/systemd/system/ngrokd.service
# 开启服务
systemctl enable ngrokd
# 启动服务
systemctl start ngrokd
# 查看一下是否显示正在运行(running)
systemctl status ngrokd
```

CentOS 6用户看这里:

```bash
# 如果是centos 6.x 请按下面的操作添加服务
cp ngrokd.sh /etc/init.d/ngrokd
#编辑文件,把 YOUR-TUNEL-DOMAIN 更改为你自己的域名,如 t.abc.com
vim /etc/init.d/ngrokd
#如果提示没有chkconfig 安装一下即可
chkconfig ngrokd on
#启动服务, 如果提示没有nohup ,安装一下即可
/etc/init.d/ngrokd start
#查看状态
/etc/init.d/ngrokd status
```

## 3. 允许端口通过防火墙
如果你启用了防火墙,比如centos 7自带的firewalld,

执行以下命令允许ngrokd端口通过防火墙:
```bash
firewall-cmd --zone=public --add-port=4443/tcp --permanent
firewall-cmd --reload
```

--EOF
