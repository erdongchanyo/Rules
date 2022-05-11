## 一、EDC-LzayConf 配置说明

### Quantumult X 简单使用说明  
> 包含较完整的策略组及分流规则、远程重写，基本满足各种软件分流需求
#### 配置文件下载地址  
下载链接：[点击下载(2022-5-10 更新)](https://raw.githubusercontent.com/erdongchanyo/Rules/main/Quantumult%20X/LazyConf/QuantumultX_EDC-Lazy.conf)

#### 1.下载配置文件后先导入并更新您自有的 Airport 订阅链接
#### 2.长按界面右下角`小风车`图标进入设置，开启`重写`以及`MitM`
> - 提示未安装证书：点击`生成证书`
> - 点击`配置证书` - 选择`确定`跳转至浏览器下载证书 - 点击`允许`进行下载
> - iPhone设置 - 通用 - VPN与设备管理 - 点击已下载的描述文件`Quantumult X CA ...`进行安装
> - iPhone设置 - 通用 - 关于本机 - 证书信任设置 - 打开`Quantumult X CA ...`证书信任开关

**[更多Airport、合租、VPS推荐](https://tgaro.top/)**  

### a. 策略组及对应分流规则
> **自动选择最优节点策略(香港)**  


> **服务器按国家(地区)分组策略**  
> - 美国服务器策略组  
> - 香港服务器策略组  
> - 日本服务器策略组  
> - 台湾服务器策略组  
> - 新加坡服务器策略组   


> **国外策略(Global)**    


> **媒体策略(GlobalMedia)**
> - 媒体细分策略(Neiflix、Disney+、HBO、YouTube、Spotify、TikTok、Bilibili  
> - 软件细分策略(Telegram、Cloubhouse、Twitter、Speedtest、PayPal、Testflight、Apple、Google、Microsoft、Weibo    


> **国内策略(Mainland)** - 无特殊需求请选择 DIRECT 策略  


> **广告策略(Advertising)** - 默认拒绝链接 RECJECT  


> **最终策略(Final)**

### b. 远程重写
> E**DC-AllinOneRewrite**
> - 彩云天气SVIP解锁(By Tartarus，需开启QuanX资源解析器   
> - Testflight下载修正  
> - Spotify Premuim解锁(By app2smile 
> - BiliBili去广告 
> - 知乎去广告+优化    


> **EDC-CookieGetRewrite**
> - 获取京东Cookie(By NobyDA)  
> - 获取爱奇艺Cookie(By NobyDA)  
> - 获取Luka APP Cookie(blackmatrix7收集) - 一个宝宝听故事的APP   


> **TikTok Unlock(blackmatrix7**
> - 仅支持TikTok 21.1.0及以下版本   
  

> **Advertising(blackmatrix7**
> - 复写去广告  


> **Redirect(blackmatrix7**
> - 重定向  
  

> **Dualsub(Neurogram-R**
> - 流媒体字幕翻译(需配合iOS快捷指令)
> - 参见教程：
> 1. Youtube: https://youtu.be/8uJUy7AevS0
> 2. BiliBili: https://www.bilibili.com/video/BV1NS4y1a7ai  
  

> ** iRingo for Apple Weather**（需配合BoxJS脚本设置）
> 1. 解锁全部天气数据类型
> 2. 替换空气质量数据，数据源为World Air Quality Index Project，采用美国AQI标准的数据。
> 3. 添加下一小时降水，数据源为气象在线
> 4. 替换空气质量地图数据，数据源为World Air Quality Index Project，采用美国AQI标准的数据。  


> ** iRingo for Location Services** （需配合BoxJS脚本设置）
> 1. 启用后即可强制「定位服务」通过基于网络的地区检测始终为特定地区。
> 2. 协助激活「Apple News」
> 3. 协助激活「来自APPLE的内容\来自APPLE的建议\Siri建议」
> 4. 激活指南针的海拔经纬度功能。
> 5. 询问Siri切换为国际版（维基百科）


> ** iRingo for Siri & Search** （需配合BoxJS脚本设置）
> - 启用后即可正常使用「来自APPLE的内容\来自APPLE的建议\Siri建议」  


> **BoxJS**
> - 访问：http://boxjs.com  
  

> **Sub-Store**
> - 高级订阅管理工具，访问：https://sub-store.vercel.app
> - Quantumult X 配置在「rewrite_local」模块

### c.脚本任务
> - **GeoIP查询**
> - **流媒体解锁检测**
> - **京东多合一签到(By NobyDA**
> - **京豆变动通知**
> - **爱奇艺会员签到(By NobyDA**
> - **Luca阅读养成每日签到**

## 二、EDC Quantumult X图标Gallery
使用方法：Quantumult X主页面 > 长按 节点/策略 > 图标 > 点击右上角“+”，输入json链接

### a. 国家/地区图标Gallery
[右键复制json链接](https://raw.githubusercontent.com/erdongchanyo/icon/main/edc-country-icon-gallery.json)

### b. 策略图标Gallery
[右键复制json链接](https://raw.githubusercontent.com/erdongchanyo/icon/main/edc-filter-icon-gallery.json)

### c. 机场图标Gallery(目前为自用机场，接受投稿)
[右键复制json链接](https://raw.githubusercontent.com/erdongchanyo/icon/main/edc-airport-icon-gallery.json)
