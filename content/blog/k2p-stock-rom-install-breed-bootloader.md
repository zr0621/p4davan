+++
categories = ["padavan"]
date = "2017-06-19T21:48:18+08:00"
tags = ["k2p", "breed", "bootloader"]
title = "k2p官改固件或原厂固件下安装breed的方法"

+++

首先确保开启了ssh 或 telnet, 然后任选一种方式登录进去控制台.
(如果不知道开启, 查看帖子 http://www.right.com.cn/forum/thread-217088-1-1.html)
#后面的为实际命令

```bash
root@K2P:/#cd /tmp
root@K2P:/tmp#opkg install http://downloads.openwrt.org/chaos_calmer/15.05/ramips/mt7621/packages/packages/wget_1.16.3-1_ramips_1004kc.ipk
```

安装成功应该可以看到有wget-ssl文件了
```bash
root@K2P:/tmp# ls /overlay/usr/bin/
dbclient     dropbearkey  scp          ssh          wget-ssl
```

然后下载breed:
```bash
wget-ssl --no-check-certificate https://breed.hackpascal.net/breed-mt7621-phicomm-k2p.bin
```

下载完成后校对一下md5是不是 56d16166de9deb781bc18b3f8b7a7ee6 ,如果OK,继续下一步操作.
```bash
root@K2P:/tmp# md5sum breed-mt7621-phicomm-k2p.bin
56d16166de9deb781bc18b3f8b7a7ee6  breed-mt7621-phicomm-k2p.bin
```

写入breed:
```bash
root@K2P:/tmp# cat /proc/mtd
dev:    size   erasesize  name
mtd0: 01000000 00010000 "ALL"
mtd1: 00030000 00010000 "Bootloader"
mtd2: 00010000 00010000 "Config"
mtd3: 00010000 00010000 "Factory"
mtd4: 00050000 00010000 "permanent_config"
mtd5: 00f60000 00010000 "firmware"
mtd6: 00c48b96 00010000 "rootfs"
mtd7: 00200000 00010000 "rootfs_data"
root@K2P:/tmp# mtd -r write /tmp/breed-mt7621-phicomm-k2p.bin Bootloader
```
写入成功的情况下会自动重启的.
