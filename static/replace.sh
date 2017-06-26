#!/bin/sh

sed -i "s@cdn.bootcss.com@cdn.bootcss.com@g" `ag -l cdnjs.cloudflare.com`
