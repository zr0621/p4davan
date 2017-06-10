+++
title = "FAQ"
description = "Frequently asked questions"
keywords = ["FAQ","How do I","questions","what if"]
+++

这里是常见问题解答,为避免互相伤害(浪费时间),遇到问题时我建议你确保以下FAQ都阅读过后再
去向别人提问.

* @author: 荒野无灯
* @date: 2017-05-12

## 0. adbyby 或 koolproxy的enable 按钮为何是灰色的？

answer: 大哥，adbyby 和 koolproxy 不能同时启用。。。

## 1. 如何通过命令快速切换$$
使用场景：某些免费的$$会定期更换密钥，或者想自己写脚本检测出最快的服务器，然后瞬间切换，而不是用固件默认的主从切换。

yzqianf：
我在编一个SS Server的速度测试脚本,想请教快速切换SS的方法。我原用修改NVRAM中的信息 和 killall ss-redir ,
等watchdog检测到SS故障后重启SS的方法,需等待十到二十秒，太慢了！
我想改用killall ss-redir后，根据新配置运行ss-redir后用iptables(还是ipset?对端口转发命令不熟悉)。
想请教切换到新的SS服务器上。
望能指点！

answer:
对于你的情况，服务器节点应该不是在路由器UI里添加的，你想动态改变，用如下方式即可：

#首先，设置将要切换的服务器的信息
#加密方法，可查看 `http://192.168.2.1/Advanced_Extensions_SS_Node.asp` HTML 源码获得,如 rc4-md5 的值是3

```bash
nvram set ss_node_method_x0=3
nvram set ss_node_password_x0=密码
nvram set ss_node_server_port_x0=服务器端口
nvram set ss_node_server_addr_x0=服务器地址
#然后重启$$服务，即会自动使用此服务器
nvram settmp ss_cur_config=0
nvram set shadowsocks_master_config=0
restart_ss
```

## 2. $$ 老是自动重启怎么回一？

answer: 固件的$$服务有一项故障检测功能，当在一分钟之内连续检测到访问指定的站点10次失败，即会重启$$并切换主从配置.
一般来说这个条件还是不是那么容易触发的。但是不排除某些人使用的是免费的$$，稳定性和速度没法保障。
你有两个选择：其一是关闭Status Detection， 其二是，花占钱购买一个好点的$$吧。

---

> In case you haven't found the answer for your question please feel free to contact us, our customer support will be happy to help you.
