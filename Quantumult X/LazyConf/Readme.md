## 一、EDC-LzayConf 配置说明
### a. 公益节点
友情提供1条 [DediPath 年付6美刀 ](https://i.tgaro.top/dp6)美国 Trojan 服务器节点，下载导入配置文件后请勿长时间占用公益节点！  
建议将该公益节点作为临时通道，尽快导入并更新您自有的 Airport 订阅链接!

**更多Airport、合租、VPS推荐可以去我的另一个站看看**  
**https://tgaro.top**

### b. 策略组及对应分流规则
包含较完整的策略组及分流规则、远程重写，基本满足各种软件分流需求
- 自动选择最优节点策略(香港)
- 服务器按国家(地区)分组策略
  > 美国服务器策略组  
  > 香港服务器策略组  
  > 日本服务器策略组  
  > 台湾服务器策略组  
  > 新加坡服务器策略组  
- 国外策略(Outside)
- 媒体策略(GMedia)
  > 媒体细分策略(Neiflix、Disney+、YouTube、Spotify、TikTok、Bilibili、iQiYi  
  > 软件细分策略(Telegram、Twitter、PayPle、Testflight、Apple、Google、Microsoft  
- 国内策略(Mainland)
- 广告策略(Advertising) - 默认拒绝链接 Reject
- 最终策略(Final)

### c. 远程重写
- EDC-AllinOneRewrite
  > 京东比价  
  > 淘宝比价  
  > EMBY解锁  
  > 彩云天气SVIP解锁(By Tartarus、需开启QuanX资源解析器)  
  > Testflight下载修正  
  > Spotify Premuim解锁(By app2smile)  
  > Youtube去片头广告
- EDC-CookieGetRewrite
  > 获取京东Cookie(By NobyDA)  
  > 获取爱奇艺Cookie(By NobyDA)  
  > 获取Luka APP Cookie(blackmatrix7收集) - 一个宝宝听故事的APP  
- Advertising(blackmatrix7收集)
  > 复写去广告
- AdvertisingScript(blackmatrix7收集)
  > 整合知乎、BiliBili、什么值得买三个APP去广告，及脚本去除开屏广告复写
- TikTok Unlock(blackmatrix7收集)
- BoxJS Rewrite 稳定版
  > 访问：http://boxjs.com

### d.定时任务
- 京东多合一签到(By NobyDa
- 京豆变动通知
- 爱奇艺签到
- Luca每日签到

### AppStore 版本配置文件下载链接
> 增加新task类型  event-interaction，可用于更多的节点信息查；包含GeoIP查询、Netflix解锁查询、Youtube Premuim支持查询、Disney+解锁查询
https://raw.githubusercontent.com/erdongchanyo/Rules/main/Quantumult%20X/LazyConf/QuantumultX_EDC-Lazy.conf

## 二、EDC Quantumult X图标Gallery
使用方法：Quantumult X主页面 > 长按 节点/策略 > 图标 > 点击右上角“+”，输入json链接

### a. 国家/地区图标Gallery
https://raw.githubusercontent.com/erdongchanyo/icon/main/edc-country-icon-gallery.json

### b. 策略图标Gallery
https://raw.githubusercontent.com/erdongchanyo/icon/main/edc-filter-icon-gallery.json

### c. 机场图标Gallery(目前为自用机场，接受投稿)
https://raw.githubusercontent.com/erdongchanyo/icon/main/edc-airport-icon-gallery.json
