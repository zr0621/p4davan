+++
categories = ["padavan"]
date = "2017-06-11T17:32:15+08:00"
tags = ["koolproxy", "problem", "debug"]
title = "为什么我的koolproxy规则不能自动更新"
banner = "img/banners/tanke-fanche.jpg"
+++

默认情况下,kp 会自动检测和更新规则的.然而现实确总是不如理想中那么美好.
有部分朋友反馈说不能更新.为避免一一回复浪费彼此的时候.我想是时候写个
文章说明一下了.

## 检查网络原因

在路由器里用命令手动下载规则试试,具体命令是:

```bash
cd /tmp/
wget https://kprule.com/koolproxy.txt
wget http://kprules.b0.upaiyun.com/koolproxy.txt.md5
#首先确保 上面两个文件都正常下载了,然后 再执行下面的命令
md5sum koolproxy.txt
cat koolproxy.txt.md5
#观察md5sum计算的结果,是不是和cat的一样,如果一样,恭喜你
#你的网络完全正常.
```

## 检查padavan storage剩余空间是不是不够
通过shellinabox 或 xshell 或 ssh 登录进路由器shell,
然后执行以下命令(#号右边的部分):

```bash
[A3004NS /opt/home/admin]# df -h | grep /etc
Filesystem                Size      Used Available Use% Mounted o
tmpfs                     4.0M      1.6M      2.4M  40% /etc
```

可以看到这个路由器的/etc有4M大小, 已经使用了1.6M了,剩余2.4M,
这样的情况,是不是kp规则下载的空间完全就足够了,没有问题了呢?不一定.
/etc有剩余,只是一个前提.

在我的padavan固件中,/etc/storage/koolproxy/data/rules 是kp规则文件的保存目录,

```bash
[A3004NS /opt/home/admin]# cd /etc/storage/koolproxy/data/rules
[A3004NS /etc/storage/koolproxy/data/rules]# rm koolproxy.txt
[A3004NS /etc/storage/koolproxy/data/rules]# wget https://kprule.com/koolproxy.txt
Connecting to kprule.com (221.229.173.116:443)
Connecting to kprules.b0.upaiyun.com (59.38.102.194:443)
koolproxy.txt        100% |**************************************************************************************************************|   465k  0:00:00 ETA
[A3004NS /etc/storage/koolproxy/data/rules]# wget -O /tmp/koolproxy.txt.md5 http://kprules.b0.upaiyun.com/koolproxy.txt.md5
Connecting to kprules.b0.upaiyun.com (59.38.102.194:80)
koolproxy.txt.md5    100% |**************************************************************************************************************|    32   0:00:00 ETA
[A3004NS /etc/storage/koolproxy/data/rules]# cat /tmp/koolproxy.txt.md5
[A3004NS /etc/storage/koolproxy/data/rules]# cat /tmp/koolproxy.txt.md5
5d7214c5b7e95f38690d547b07d085fd[A3004NS /etc/storage/koolproxy/data/rules]# md5sum koolproxy.txt
5d7214c5b7e95f38690d547b07d085fd  koolproxy.txt
```
如果你的结果类似如上所示,cat md5文件的结果和md5sum 计算的结果一致,就说明空间也是足够的.
否则, `wget https://kprule.com/koolproxy.txt` 提示保存失败的话,有可能是空间不足了.
这个时候,你可以通过删除adbyby的数据来解决, 执行: `rm -rf /etc/storage/adb` 删除后再
重试.

## 规则更新日期显示问题

由于设计的时候,默认是kp服务重启后再更新日期显示的.
但是kp自己检测到有规则更新,自动更新后会重启kp自己,但是不是重启kp服务,
因此在UI界面显示的更新日期很可能还是上一次的数据,解决办法很简单:
关闭kp,再打开kp (以后统称重启kp服务)即可.
或者在cron那里增加一条配置(新版本的固件默认就有了,如果注释了,去掉开头的#即可,
不用重复添加):

```
0 */12 * * *     /sbin/restart_koolproxy
```
这个配置的意思是每隔12个小时重启一次kp服务.
