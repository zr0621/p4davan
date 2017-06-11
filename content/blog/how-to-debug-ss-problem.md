+++
title = "ss不工作怎么排查问题"
date = "2017-06-11T16:30:53+08:00"
tags = []
categories = ["padavan"]
banner = "img/banners/kuaishangche.jpg"
+++

## 0.不工作的具体表现

1. 在开启了`Status Detection`的情况下,`Active SS Node`那里没有显示绿色的字样:`Working`
2. 查看插件的Status页面, anti DNS pollution 显示黄色的`err`
3. 打不开google或twitter等

## 1.检查配置

### 1.1 $$工作模式

**$h4d0ws0cks Mode** 有三种模式,一般来说选择默认的`chnroute`模式即可.
`global` 是全局, `gfwlist`是黑名单模式,只有在黑名单里的才走tunnel.
`chnroute`模式与`gfwlist`正好相反,只有国内IP不走tunnel.

### 1.2 $$ DNS提供者
**DNS Provider** 有三种来源,一般来说选择默认的特定UDP端口(special udp port)模式即可.
这是效率最高的一个模式.但也许个别地方不能用. 如果不能用,换成
`dns2socks` 模式即可.
special udp port模式默认Custom Foreign DNS是用的opendns (208.67.222.222),
opendns支持两个非标准端口进行dns查询,一个是443,另一个是5353.
443是https协议的默认端口,这个一般没有人会去封.因此不失为一个好方法.
假如你把Custom Foreign DNS从opendns 切换到了 Google public DNS,
那么你要手动把Custom Foreign DNS Port改成标准的53端口,因此Google只
支持53端口. 同时,由于你现在使用的是标准的53端口,因此不能再使用
special udp port模式了.
如果你觉得opendns不好,你可以自己在vps上面安装一下dnsmasq, 然后由dnsmasq代理
google public dns,并且将dnsmasq的监听端口设定为任意非53端口,这样你也可以
继续使用special udp port模式了.

### 1.3 超时设置
`Timeout` 的默认值是300,这个是要和服务端保持一致的,除非你网络情况特别特别好,
否则不要去试图调小这个值.

### 1.4 UDP转发设置
`UDP Relay`: 检查这个选项是不是打开了,如果打开了,你的服务端那边一定要支持UDP转发,
不然结果就是路由器这边的客户端不能正常工作了. 特别是有人喜欢用一些免费的$$服务器,
或者是从网上购买的,这个选项他们不一定打开了.

### 1.5 用户名密码端口等配置
如果排除了这几个选项,那么只有$$ Node页面的配置出问题了.问题的结果只有一个,导致
问题产生的原因却是各不相同.
比如你服务器地址,端口,加密方式,密码任何一个填写错误,或者,你的服务器防火墙阻挡了
$$的端口. 这些你都需要自己一一排查.

## 2 注意事项

**关于Status页的anti DNS pollution注意事项:**

> 当`DNS Provider`为`special udp port`模式时,`DNS timeout`和`anti DNS pollution`全绿并
> 不代表你的$$工作正常. 因为`special udp port`模式时一般不存在DNS pollution.
> 所以如果你想确定一下是不是$$的问题,你得把`DNS Provider`设置为dns2socks模式.
> 如果你想确定下你的$$服务端是不是支持UDP转发,请把`DNS Provider`设置为ss-`tunnel`模式.

**关于Status Detection选项注意事项:**

> 这个开关如果打开,意味着如果一分钟内路由器检测到有连续10次无法访问相应的探测点,就会
> 认为$$是工作不正常了从而重启$$服务. 如果你的$$服务器并不像想象中的那么稳定,我建议你
> 关闭这个选项. 关闭`Status Detection`后,没有显示绿色或`Working`并不代表$$工作不正常.

**电脑DNS设置问题**

> 除非你知道你自己在干什么,否则不要手动设置客户机(你的电脑,手机,平板等)的DNS.
> 默认的自动获取就OK.
> 假如你在路由器里设置DNS Provider 为 special udp port 模式,然而却手动设置了电脑
> 的DNS为Google的 8.8.8.8 , 那么结果很可能是, 你得到的解析结果是被污染的.
> 为什么我说可能,因为这得分情况的.并不是所有情况都是这样.然而我这里也没有必要细说了.
> 你只要知道,一般情况下,让设备自动获取DNS就行.

--EOF
