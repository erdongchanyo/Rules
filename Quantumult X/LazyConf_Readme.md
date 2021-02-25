# ErdongChan懒人配置说明

**1⃣️配置文件根据 ErdongChan (重点👉)  `百嫖的 Quantumult X TF` 版本制作，适配商店 v1.0.19-build501 版本**
其它版本未做测试

——————————

**2⃣️提供免费节点订阅，方便用户体验**

导入配置后，为获得更好使用体验，请务必导入个人节点或订阅

——————————

**2⃣️所有策略图标采用 Erdongchan 图标组**

图标库地址：https://github.com/erdongchanyo/icon

策略组图标如果出现绿色底色影响美观，请按如下操作更换图标背景:

长按策略组 - 背景 - 选择第一排以一个 透明背景 - ok

——————————

**Update: 2021-02-25**

——————————

## A-入门版：quantumult_EDC-Lazy-Lite.conf

地址：https://raw.githubusercontent.com/erdongchanyo/Rules/main/Quantumult%20X/quantumult_EDC-Lazy-Lite.conf

**——————————**

**包含简单的策略组及分流规则，仅满足富强需求**

**——————————**

### 策略组及对应分流规则：

> - 自动选择最优节点策略(香港)
> - 国外连接策略（无细分策略）
> - 国内连接策略（无细分策略）
> - 最终策略



## B-基础版：quantumult_EDC-Lazy-Normal.conf

地址：https://raw.githubusercontent.com/erdongchanyo/Rules/main/Quantumult%20X/quantumult_EDC-Lazy-Normal.conf

**——————————**

**包含简单的策略组及分流规则、包含常用远程重写、包含部分薅羊毛定时任务**

**满足基本富强需求的同时，体验去广告、定时任务薅羊毛等乐趣**

❗️定时任务ck等获取方法请参考电报群教程

**——————————**

#### 1️⃣ 策略组及对应分流规则：

> - 自动选择最优节点策略(香港)
> - 国外连接策略（无细分策略）
> - 国内连接策略（无细分策略）
> - 最终策略

### 2️⃣ 远程重写：

> - 常用
>
>   > 神机通用
>   >
>   > 神机去广告
>   >
>   > 神机去广告Plus
>   >
>   > 神机去Youtube广告
>   >
>   > Boxjs
>   >
>   > TikTok解锁
>   >
>   > Testflight区域限制解锁
>
> - cookie获取（默认禁用）
>
>   > cookie获取远程重写集合(京东、爱奇艺、网易云音乐、Bilibili)
>   >
>   > 中青cookie获取、中青body获取
>   >
>   > 葱花视频body获取
>   >
>   > 笑谱token获取
>   >
>   > 芝嫲视频body获取

### 3️⃣ 定时任务：(默认禁用)

> 中青签到&转盘宝箱
>
> 中青自动阅读
>
> 中青浏览赚
>
> 葱花视频
>
> 笑谱
>
> 芝嫲视频
>
> 京东多合一签到
>
> 爱奇艺会员签到
>
> Bilibili直播签到
>
> 网易云音乐双签



## C-Pro版：quantumult_EDC-Lazy.conf

地址：https://raw.githubusercontent.com/erdongchanyo/Rules/main/Quantumult%20X/quantumult_EDC-Lazy.conf

**——————————**

**包含较为完整的策略组及分流规则、包含常用远程重写、包含部分薅羊毛定时任务**

**满足各种软件分流需求，体验解锁网易云、去广告、定时任务薅羊毛等乐趣**

❗️定时任务ck等获取方法请参考电报群教程

**——————————**

#### 1️⃣ 策略组及对应分流规则：

> - 自动选择最优节点策略(香港)
>
> - 服务器按国家(地区)分组策略
>
>   > 美国策略组
>   >
>   > 新加坡策略组
>   >
>   > 香港策略组
>   >
>   > 台湾策略组
>   >
>   > 韩国策略组
>   >
>   > 日本策略组
>
> - 国外连接策略（包含细分策略）
>
>   > 国外媒体策略(Neiflix、YouTube、Spotify、TikTok
>   >
>   > 软件服务策略(Telegram、Clubhouse、Twitter、Apple、Testflight、Microsoft、Speedtest、PayPal、LOL
>
> - 国内连接策略（包含细分策略）
>
>   > 国内媒体策略
>   >
>   > 网易云音乐策略
>   >
>   > 网易云音乐解锁服务器分组策略
>
> - 最终策略

——————————

**⚠️网易云解锁服务器可以使用方法：**

a: `设置` > `配置文件` > `新建配置片段` > `节点片段` > 粘贴以下公用节点：

```
http=music.lolico.me:39000, fast-open=false, udp-relay=false, tag=解锁网易云节点1

http=block4music.poetyin.me:39000, fast-open=false, udp-relay=false, tag=解锁网易云节点2

shadowsocks=blockmusic.poetyin.me:30003, method=aes-128-gcm, password=desperadoj.com_free_proxy_emx2, fast-open=false, udp-relay=false, tag=解锁网易云节点3

shadowsocks=music.desperadoj.com:30001, method=aes-128-gcm, password=desperadoj.com_free_proxy_emx2, fast-open=false, udp-relay=false, tag=解锁网易云节点4

shadowsocks=music.desperadoj.com:30003, method=aes-128-gcm, password=desperadoj.com_free_proxy_emx2, fast-open=false, udp-relay=false, tag=解锁网易云节点5
```

b: `保存` > 命名为[NeteaseServer]

c: `设置` > `节点` > `引用` > 输入[NeteaseServer] > 打开[资源解析器] > 添加

——————————

⚠️**Clubhouse分流使用方法（提示信号差或无声音解决办法）**

Clubhouse共两条分流，分别为 `域名规则` 和 `IP规则` ，`域名规则` 默认走 Clubhouse策略、`IP规则` 默认走direct直连，解决无声音或网络差问题，也可将 `IP规则` 匹配Clubhouse策略(前提是策略下选择的节点开启了udp)，走代理声音会好很多。

### 2️⃣ 远程重写：

> - 常用
>
>   > 神机通用
>   >
>   > 神机去广告
>   >
>   > 神机去广告Plus
>   >
>   > 神机去Youtube广告
>   >
>   > Boxjs
>   >
>   > TikTok解锁
>   >
>   > Testflight区域限制解锁
>
> - cookie获取（默认禁用）
>
>   > cookie获取远程重写集合(京东、爱奇艺、网易云音乐、Bilibili)
>   >
>   > 中青cookie获取、中青body获取
>   >
>   > 葱花视频body获取
>   >
>   > 笑谱token获取
>   >
>   > 芝嫲视频body获取

### 3️⃣ 定时任务：(默认禁用)

> 中青签到&转盘宝箱
>
> 中青自动阅读
>
> 中青浏览赚
>
> 葱花视频
>
> 笑谱
>
> 芝嫲视频
>
> 京东多合一签到
>
> 爱奇艺会员签到
>
> Bilibili直播签到
>
> 网易云音乐双签
