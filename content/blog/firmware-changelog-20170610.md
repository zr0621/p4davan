+++
title = "2017-06-10 固件 changelog"
date = "2017-06-10T22:44:35+08:00"
tags = ["firmware", "update"]
categories = ["padavan"]
banner = "img/banners/kuaishangche.jpg"
+++

## 终于又迎来了一大波更新

五机齐发(D1,Y1,L1,K2,K2_256),准备开刷
虽然说是beta,不过在此之前群主已经测试多次.不出意外这就是正式版.
尝鲜下载地址:
http://router.mirror1.80x86.io:8088/beta/?C=S&O=D

2017-06-10 changelog:

1. 同步更新到padavan最新官方源码.
2. 修复 CVE-2017-7494安全漏洞(典型应用:WanaCrypt0r)
   @see https://nvd.nist.gov/vuln/detail/CVE-2017-7494
3. koolproxy 更新到 3.5.9.1 (@see http://koolshare.cn/thread-64086-1-1.html)
   据kp更新日志:为了提升速度，内存管理更换为jemalloc，内存管理更有效，内存占用可能会比之前版本更多一些
4. wifi: 启用 802.11r 协议(暂时没找到应用方法)
5. 迅雷离线: 支持自定义package下载地址.
6. aria2 更新到最新的 1.32.0 (@see https://github.com/aria2/aria2/releases/tag/release-1.32.0)
7. $$-libev: upgrade to Commits on Jun 9, 2017
8. simple-obfs: upgrade to 0.0.3-1
9. xkcptun: upgrade to Commits on Jun 9, 2017
10. dnsmasq 更新至最新的 2.77 (@see http://www.thekelleys.org.uk/dnsmasq/CHANGELOG)
11. PSG1218-K2 , PSG1218-256M: fix LED problem.(back to purple)
12. 增加 curl 7.54.0 (K2 8M固件没有)
13. transmission 升级到最新版 2.92
