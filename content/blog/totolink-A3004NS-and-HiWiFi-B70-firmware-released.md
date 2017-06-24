+++
categories = ["padavan"]
date = "2017-06-24T15:54:30+08:00"
tags = ["firmware", "update", "A3004NS", "B70"]
title = "Totolink A3004NS 和 HiWiFi B70 固件双车齐发"

+++

## 友情提示
刷机有风险,看清再操作.产生任何问题自行承担.

## 固件界面DEMO
我的padavan固件 的demo 页面就是 基于 3004NS 建立的： http://pdv.80x86.io/

固件正在编译上传中，所有我发布的padavan固件，下载地址：http://p4davan.80x86.io/download/

敬告:
在没有看本站的说明之前,请不要自行下载固件刷机, 否则容易造成不必要的问题。

我你928：哎，刷老毛子的A3004NS华硕固件，2.4G会偶尔丢失。很无语！！！希望灯哥早点发布！希望这个完美适配A3004NS的padavan固件不会偶尔丢失2.4G。
荒野的回复是：我的A3004NS一直作为我的主路由，稳定运行超过半年以上，没有这个问题。

## 1. 硬件配置PK

### B70 配置:
```
SOC：MT7621AT 双核 880MHz
RAM：DDR3 256MB（南亚）
Flash：128MB NAND
无线芯片：MT7612EN + MT7603EN
路由器提供有1个千兆WAN口、3个千兆LAN口、1个USB 3.0接口、1个USB 2.0接口
无线芯片：MT7612EN + MT7603EN，(据传2.4G都有独立的PA功放芯片和LNA功放芯片，5G内置没有独立的PA功放芯片和LNA功放芯片)
```

### A3004NS国行配置：
```
SOC：MT7621AT 双核 880MHz
RAM：DDR3 256MB（南亚）
Flash：16MB SPI
无线芯片：MT7612EN + MT7602EN
路由器提供有1个千兆WAN口、4个千兆LAN口、1个USB 3.0接口
无线芯片：MT7612EN + MT7602EN (据传2.4G 5G 均有外置PA)
```

> 关于PA和LNA
> 实际测试结果, B70 和 A3004NS信号强度相差无几. 因此不必太过介意.
> 且3004N只有外置PA,并无LNA.

## 2.刷机说明

### 2.1 B70刷机说明

> 我的padavan固件是和官方的闪存结构保持一致的.
> 可以在官方固件下直接刷入pb-boot然后直接从pb-boot刷入这个固件.
> 但是有一点:官方固件的那些分区,都会在安装新固件后擦除掉. 如果你觉得你想备份一下,你可以
> 自行备份.
如:
```bash
#dd if=/dev/mtd7 of=/tmp/bdinfo.bin
#dd if=/dev/mtd11 of=/tmp/oem.bin
```

没有开启开发者模式的请去开启开发者模式.
登录之后选择"我的路由" (https://app.hiwifi.com/store.php?m=router&a=app)
然后选中当前路由,点击 "路由器信息", 拉到底部展开"高级设置", 申请开通开发者模式即可.

备份mac地址
弄个txt文件保存一下现有系统的mac地址,如:
```
wan: D6:EE:07:08:08:07
lan: D4:EE:07:08:08:06
```

```bash
BusyBox v1.22.1 (2016-11-08 02:36:20 CST) built-in shell (ash)
Enter 'help' for a list of built-in commands.

***********************************************************
              __  __  _              _   ____  _   TM
             / / / / (_) _      __  (_) / __/ (_)
            / /_/ / / / | | /| / / / / / /_  / /
           / __  / / /  | |/ |/ / / / / __/ / /
          /_/ /_/ /_/   |__/|__/ /_/ /_/   /_/
                  http://www.hiwifi.com/
***********************************************************
root@Hiwifi:~# cd /tmp
root@Hiwifi:/tmp# wget http://files.80x86.io/router/rom/bootloader/B70/pb-boot-hc5962.bin
Connecting to files.80x86.io (172.104.85.105:80)
pb-boot-hc5962.bin   100% |**************************************************************************************************************|   157k  0:00:00 ETA
root@Hiwifi:/tmp# md5sum pb-boot-hc5962.bin
0ebdb3f60b5c407fa82570855c703522  pb-boot-hc5962.bin
root@Hiwifi:/tmp# cat /proc/mtd
dev:    size   erasesize  name
mtd0: 00080000 00020000 "u-boot"
mtd1: 00080000 00020000 "debug"
mtd2: 00040000 00020000 "Factory"
mtd3: 02000000 00020000 "firmware"
mtd4: 00160000 00020000 "kernel"
mtd5: 01ea0000 00020000 "rootfs"
mtd6: 00080000 00020000 "hw_panic"
mtd7: 00080000 00020000 "bdinfo"
mtd8: 00080000 00020000 "backup"
mtd9: 01000000 00020000 "overlay"
mtd10: 02000000 00020000 "firmware_backup"
mtd11: 00200000 00020000 "oem"
mtd12: 02ac0000 00020000 "opt"
root@Hiwifi:/tmp# mtd write pb-boot-hc5962.bin u-boot
Unlocking u-boot ...

Writing from pb-boot-hc5962.bin to u-boot ...
[e:0]	[w0]
[e:1]	[w1]
root@Hiwifi:/tmp# mtd erase firmware_backup
Unlocking firmware_backup ...
Erasing firmware_backup ...
root@Hiwifi:/tmp#
```

### mac地址修复
padavan成功启动后,做一次双清.
再次启动后, 登录进ssh或直接在控制台操作:

> !! 注意,不要照这个原样复制,这个只是demo,
> 实际命令你要用自己备份下来的mac地址.

```bash
[B70 /home/root]# lan_eeprom_mac D4:EE:07:08:08:06
LAN EEPROM MAC address: D4:EE:07:08:08:06

Please reboot router!
[B70 /home/root]# wan_eeprom_mac D4:EE:07:08:08:07
WAN EEPROM MAC address: D6:EE:07:08:08:07

Please reboot router!
[B70 /home/root]# sync
[B70 /home/root]# reboot
```

### 2.2 A3004NS 刷机说明

先登录进官方固件后台,同样,先备份一下lan和wan等的mac地址.
然后下载官方直刷固件:
[STOCK_ROM_UPGRADE_A3004NS_3.4.3.9-099_20170307-0247.trx][088fc74e]

  [088fc74e]: http://files.80x86.io/router/rom/A3004NS/STOCK_ROM_UPGRADE_A3004NS_3.4.3.9-099_20170307-0247.trx "STOCK_ROM_UPGRADE_A3004NS_3.4.3.9-099_20170307-0247.trx"

在官方固件后台通过升级刷入.

然后,再去 http://p4davan.80x86.io/download/ 下载更新最新的padavan固件即可.

最后,备份eeprom. 这里不再复述.请参考我以前写的文章: http://80x86.io/post/command-to-backup-padavan-firmware-eeprom

恢复mac地址的方法:同上面的B70的命令类似.自行操作下吧.

注意事项:

> 我有了解到有一个pb-boot是支持A3004NS的.
> 但是我的固件是适配原厂布局的.(这个pb-boot并没有适配原厂布局).
> 所以我的固件如果刷pb, 会无法启动.
> 同样的,如果你刷pb, 官方固件也会无法启动.
> pb-boot大小 有181k,但是官方 的boot 才 128K. 这也就注定了
> pb-boot不能够支持官方固件的布局.
>
> 原厂uboot我这里有做一个备份:
> http://files.80x86.io/router/rom/bootloader/A3004NS/a3004ns_stock_uboot.bin

如果你想从pb-boot刷我的固件,那么你只能先刷breed (迅雷时光机的breed可以)
http://files.80x86.io/router/rom/bootloader/A3004NS/breed-mt7621-xunlei-timeplug.bin

一般刷了pb-boot的都是刷了pandorabox的,所以你只能从pandorabox下面刷
breed. 然后再从breed刷我的固件. 最后在padavan下面刷回官方uboot.

### 什么时候你的A3004NS固件会支持从pb-boot直刷?
等吧,等有时间了再弄. 目前来说只支持原厂.

## 3. 关于固件背后的故事

----------------------------------------------------
关于国行A3004NS的故事：
早在 2016年11月我入手了3004NS ， 就已经做好了完美适配的padavan固件，并且支持官方系统后台直刷。

为什么一直没有公开呢，这里说明一下。主要是当时3004NS还没有什么可以刷的固件。如果此时发布
老毛子固件 ， 可能会引起涨价。 我在群里也说了， 3004NS 便宜的时候，你们尽量去撸。
我会在不确定的时间发布这个固件。
时隔半年多,今天终于发布了.

----------------------------------------------------

关于B70的故事：
其实我手里也是没有硬件的，不过前些日子
我padavan群里的遥哥和麦dou表示想把撸到的B70发挥一下余热。
因为B70撸到手了一直没有合适的老毛子固件。
于是把机器寄给我整固件了。我想，既然固件已经做出来了，不如分享到恩山吧。

----------------------------------------------------
--EOF
