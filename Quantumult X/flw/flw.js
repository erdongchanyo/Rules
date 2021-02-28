/* ziye 
github地址 https://github.com/ziye66666
TG频道地址  https://t.me/ziyescript
TG交流群   https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接  https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/ziye.boxjs.json
转载请备注个名字，谢谢

⚠️返利网
1.20 调整为完整版
1.23 增加签到任务等
1.24 修复错误
1.24 优化显示
1.24 修复判定错误，调整视频延迟，修复node环境错误
1.25 修复各种判定，设置CASH变量>=0.3，启动天天领现金模块
1.26 修复延迟判定问题，修复node环境问题
1.31 增加兑换，默认关闭
2.1 修复判定,修复2
2.2 防止黑号，兑换时间限制在10点到11点之间
2.17 增加阅读任务以及阅读提现，20个body 0.12元，默认大于3元提现3元，请提前关注返利网官方公众号
2.17-2 修改判定，进文章直接获取body,修复判定


⚠️一共5个位置 5个ck  👉 6条 Secrets 
多账号换行
第一步 添加  hostname=huodong.fanli.com,passport.fanli.com,gw.fanli.com,

第二步 添加重写 

点击 我的 获取flwurlVal
flwurlVal 👉FL_flwURL

点击 首页 签到赚钱 获取flwheaderVal
flwheaderVal 👉FL_flwHEADER

注释header重写 点击 首页 签到赚钱 视频任务 获取flwspbodyVal
flwurlVal 👉FL_flwspBODY

注释header重写 点击 首页 签到赚钱 火山热门视频 获取flwqwbodyVal
flwqwbodyVal 👉FL_flwqwBODY

设置提现变量 可设置 0.3以上 务必关注官方公众号，并且手动领取红包
CASH  👉  FL_CASH

设置兑换变量 可设置0 5 50 100   默认0  不兑换
DHCASH  👉  FL_DHCASH

注释header重写 点击 首页 签到赚钱 去阅读赚钱 看文章 获取flwydbodyVal（最多20个body）
flwydbodyVal 👉FL_flwydBODY



⚠️主机名以及重写👇
hostname=huodong.fanli.com,passport.fanli.com,gw.fanli.com,

############## 圈x
#返利网获取header
https:\/\/(huodong\.fanli\.com\/*||passport\.fanli\.com\/*||gw\.fanli\.com\/*) url script-request-header https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/flw.js   
#返利网获取body
https:\/\/(huodong\.fanli\.com\/*||passport\.fanli\.com\/*||gw\.fanli\.com\/*) url script-request-body https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/flw.js   

############## loon
#返利网获取header
http-request https:\/\/(huodong\.fanli\.com\/*||passport\.fanli\.com\/*||gw\.fanli\.com\/*) script-path=https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/flw.js, requires-header=true, tag=返利网获取header

http-request https:\/\/(huodong\.fanli\.com\/*||passport\.fanli\.com\/*||gw\.fanli\.com\/*) script-path=https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/flw.js,requires-body=1,max-size=0, tag=返利网获取body

############## surge
#返利网获取header
返利网获取header = type=http-request,pattern=https:\/\/(huodong\.fanli\.com\/*||passport\.fanli\.com\/*||gw\.fanli\.com\/*),script-path=https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/flw.js

#返利网获取body
返利网获取body = type=http-request,pattern=https:\/\/(huodong\.fanli\.com\/*||passport\.fanli\.com\/*||gw\.fanli\.com\/*),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye66666/JavaScript/main/Task/flw.js





*/
const $ = Env("返利网");
$.idx = ($.idx = ($.getval('flwSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const COOKIE = $.isNode() ? require("./flwCOOKIE") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1 // 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 1; // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
$.message = '', COOKIES_SPLIT = '', CASH = '', DHCASH = '';
let ksp, zp, qw, sp, ms,yd;
let dd = 0;
id = ['329', '263', '313', '207', '241', '251', '249', '245', '201', '297']
const flwurlArr = [];
const flwheaderArr = [];
const flwspbodyArr = [];
const flwqwbodyArr = [];
const flwydbodyArr = [];
let flwurlVal = ``;
let flwheaderVal = ``;
let flwspbodyVal = ``;
let flwqwbodyVal = ``;
let flwydbodyVal = ``;
let middleflwURL = [];
let middleflwHEADER = [];
let middleflwspBODY = [];
let middleflwqwBODY = [];
let middleflwydBODY = [];
// 没有设置 FL_CASH 则默认为 0 不提现
if ($.isNode()) {
  CASH = process.env.FL_CASH || 0;
  // 没有设置 FL_DHCASH 则默认为 0 不兑换
  DHCASH = process.env.FL_DHCASH || 0;
}
if ($.isNode() && process.env.FL_flwURL) {
  COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
  if (
    process.env.FL_flwURL &&
    process.env.FL_flwURL.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleflwURL = process.env.FL_flwURL.split(COOKIES_SPLIT);
  } else {
    middleflwURL = process.env.FL_flwURL.split();
  }
  if (
    process.env.FL_flwHEADER &&
    process.env.FL_flwHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleflwHEADER = process.env.FL_flwHEADER.split(COOKIES_SPLIT);
  } else {
    middleflwHEADER = process.env.FL_flwHEADER.split();
  }
  if (
    process.env.FL_flwspBODY &&
    process.env.FL_flwspBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleflwspBODY = process.env.FL_flwspBODY.split(COOKIES_SPLIT);
  } else {
    middleflwspBODY = process.env.FL_flwspBODY.split();
  }
  if (
    process.env.FL_flwqwBODY &&
    process.env.FL_flwqwBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleflwqwBODY = process.env.FL_flwqwBODY.split(COOKIES_SPLIT);
  } else {
    middleflwqwBODY = process.env.FL_flwqwBODY.split();
  }
  if (
    process.env.FL_flwydBODY &&
    process.env.FL_flwydBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleflwydBODY = process.env.FL_flwydBODY.split(COOKIES_SPLIT);
  } else {
    middleflwydBODY = process.env.FL_flwydBODY.split();
  }
  
  
}
if (COOKIE.flwurlVal) {
  FL_COOKIES = {
    "flwurlVal": COOKIE.flwurlVal.split('\n'),
    "flwheaderVal": COOKIE.flwheaderVal.split('\n'),
    "flwspbodyVal": COOKIE.flwspbodyVal.split('\n'),
    "flwqwbodyVal": COOKIE.flwqwbodyVal.split('\n'),
	"flwydbodyVal": COOKIE.flwydbodyVal.split('\n'),
  }
  Length = FL_COOKIES.flwurlVal.length;
}
if (!COOKIE.flwurlVal) {
  if ($.isNode()) {
    Object.keys(middleflwURL).forEach((item) => {
      if (middleflwURL[item]) {
        flwurlArr.push(middleflwURL[item]);
      }
    });
    Object.keys(middleflwHEADER).forEach((item) => {
      if (middleflwHEADER[item]) {
        flwheaderArr.push(middleflwHEADER[item]);
      }
    });
    Object.keys(middleflwspBODY).forEach((item) => {
      if (middleflwspBODY[item]) {
        flwspbodyArr.push(middleflwspBODY[item]);
      }
    });
    Object.keys(middleflwqwBODY).forEach((item) => {
      if (middleflwqwBODY[item]) {
        flwqwbodyArr.push(middleflwqwBODY[item]);
      }
    });
	Object.keys(middleflwydBODY).forEach((item) => {
      if (middleflwydBODY[item]) {
        flwydbodyArr.push(middleflwydBODY[item]);
      }
    });
	
  } else {
    flwurlArr.push($.getdata("flwurl"));
    flwheaderArr.push($.getdata("flwheader"));
    flwspbodyArr.push($.getdata("flwspbody"));
    flwqwbodyArr.push($.getdata("flwqwbody"));
    flwydbodyArr.push($.getdata("flwydbody"));	
    // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
    if ("flwCASH") {
      CASH = $.getval("flwCASH") || '0';
    }
    if ("flwDHCASH") {
      DHCASH = $.getval("flwDHCASH") || '0';
    }
    let flwCount = ($.getval('flwCount') || '1') - 0;
    for (let i = 2; i <= flwCount; i++) {
      if ($.getdata(`flwurl${i}`)) {
        flwurlArr.push($.getdata(`flwurl${i}`));
        flwheaderArr.push($.getdata(`flwheader${i}`));
        flwspbodyArr.push($.getdata(`flwspbody${i}`));
        flwqwbodyArr.push($.getdata(`flwqwbody${i}`));
		flwydbodyArr.push($.getdata(`flwydbody${i}`));
      }
    }
  }
  if(flwurlArr==''){
    Length =0
      }else Length = flwurlArr.length
}
  

function GetCookie() {
  //返利登录
  if ($request && $request.url.indexOf("getUserInfo?") >= 0) {
    const flwurlVal = $request.url
    if (flwurlVal) $.setdata(flwurlVal, "flwurl" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取flwurlVal✅: 成功,flwurlVal: ${flwurlVal}`
    );
    $.msg($.name + $.idx, `获取flwurlVal: 成功🎉`, ``);
  }
  //返利网账户
  if ($request && $request.url.indexOf("ajaxGetNewInitState") >= 0) {
    const flwheaderVal = JSON.stringify($request.headers);
    if (flwheaderVal) $.setdata(flwheaderVal, "flwheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取flwheaderVal✅: 成功,flwheaderVal: ${flwheaderVal}`
    );
    $.msg($.name + $.idx, `获取flwheaderVal: 成功🎉`, ``);
  }
  //返利网视频
  if ($request && $request.url.indexOf("reward") >= 0 && $request.body.indexOf("content=") >= 0) {
    const flwspbodyVal = $request.body;
    if (flwspbodyVal) $.setdata(flwspbodyVal, "flwspbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取flwspbodyVal✅: 成功,flwspbodyVal: ${flwspbodyVal}`
    );
    $.msg($.name + $.idx, `获取flwspbodyVal: 成功🎉`, ``);
  }
  //返利网趣味
  if ($request && $request.url.indexOf("videofeed") >= 0 && $request.body.indexOf("content=") >= 0) {
    const flwqwbodyVal = $request.body;
    if (flwqwbodyVal) $.setdata(flwqwbodyVal, "flwqwbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取flwqwbodyVal✅: 成功,flwqwbodyVal: ${flwqwbodyVal}`
    );
    $.msg($.name + $.idx, `获取flwqwbodyVal: 成功🎉`, ``);
  }
  
   //返利网阅读
  if ($request && $request.url.indexOf("news") >= 0 && $request.url.indexOf("validate.htm") >= 0) {
        const flwydbodyVal = $request.body
        if (flwydbodyVal) {
            let bodys = $.getdata('flwydbody' + $.idx);
		
            if (bodys) {
		    
                if (bodys.indexOf(flwydbodyVal) >= 0) {
                    $.msg('body重复跳过');
                    $.done();
                }
                flwydBody = bodys.split('&');
                bodys = flwydbodyVal + '&' + bodys;
            } else {
                bodys = flwydbodyVal;		    
            }
            $.setdata(bodys, "flwydbody" + $.idx);
            $.log(
                `[${$.name + $.idx}] 获取flwydbody${flwydBody.length+1}✅: 成功,flwydbody${flwydBody.length+1}: ${flwydbodyVal}`
            );
            $.msg($.name + $.idx, `获取flwydbody${flwydBody.length+1}✅: 成功🎉`)
        }
    }
  
}
console.log(
  `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);
console.log(
  `============ 共 ${Length} 个${$.name}账号=============\n`
);
console.log(`============ 提现标准为：${CASH} =============\n`);
console.log(`============ 兑换标准为：${DHCASH} =============\n`);
//时间
nowTimes = new Date(
  new Date().getTime() +
  new Date().getTimezoneOffset() * 60 * 1000 +
  8 * 60 * 60 * 1000
);
//今天
Y = nowTimes.getFullYear() + '-';
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1) + '-';
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
console.log(ddtime)
//当前时间戳
function tts(inputTime) {
  if ($.isNode()) {
    TTS = Math.round(new Date().getTime() +
      new Date().getTimezoneOffset() * 60 * 1000).toString();
  } else TTS = Math.round(new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString();
  return TTS;
};
//当前10位时间戳
function ts(inputTime) {
  if ($.isNode()) {
    TS = Math.round((new Date().getTime() +
      new Date().getTimezoneOffset() * 60 * 1000) / 1000).toString();
  } else TS = Math.round((new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000) / 1000).toString();
  return TS;
};
//今天0点时间戳时间戳
function daytime(inputTime) {
  if ($.isNode()) {
    DAYTIME =
      new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
  } else DAYTIME = new Date(new Date().toLocaleDateString()).getTime();
  return DAYTIME;
};
//时间戳格式化日期
function time(inputTime) {
    if ($.isNode()) {
        var date = new Date(inputTime + 8 * 60 * 60 * 1000);
    } else var date = new Date(inputTime);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
};
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
  GetCookie()
  $.done();
} else {
  !(async () => {
    await all();
    await $.wait(500);
    await msgShow();
  })()
  .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
}
async function all() {
  if (!Length) {
    $.msg(
      $.name,
      '提示：⚠️请点击前往获取cookie\n',
      'http://m.a8fdj.cn/Invite/promotion?id=775&spm=page_name.h5.pty-wxzcpv~std-65354&go=http%3A%2F%2Fhuodong.a8fdj.cn%2Fh5%2FInvitefriendsreward%2FregisterCallback%3Fuserid%3D373511081%26id%3D775%26sn%3D47ecab06aba43e015082e531d8214eb5', {
        "open-url": "http://m.a8fdj.cn/Invite/promotion?id=775&spm=page_name.h5.pty-wxzcpv~std-65354&go=http%3A%2F%2Fhuodong.a8fdj.cn%2Fh5%2FInvitefriendsreward%2FregisterCallback%3Fuserid%3D373511081%26id%3D775%26sn%3D47ecab06aba43e015082e531d8214eb5"
      }
    );
    return;
  }
  for (let i = 0; i < Length; i++) {
    if (COOKIE.flwurlVal) {
      flwurlVal = FL_COOKIES.flwurlVal[i];
      flwheaderVal = FL_COOKIES.flwheaderVal[i];
      flwspbodyVal = FL_COOKIES.flwspbodyVal[i];
      flwqwbodyVal = FL_COOKIES.flwqwbodyVal[i];
	  flwydbodyVal = FL_COOKIES.flwydbodyVal[i];
    }
    if (!COOKIE.flwurlVal) {
      flwurlVal = flwurlArr[i];
      flwheaderVal = flwheaderArr[i];
      flwspbodyVal = flwspbodyArr[i];
      flwqwbodyVal = flwqwbodyArr[i];
	  flwydbodyVal = flwydbodyArr[i];
    }
    flwurlValsplit = flwurlVal.split('&')
    uid = flwurlValsplit[1].split('=')[1]
    token = flwurlValsplit[2].split('=')[1]
    sn = flwurlValsplit[2].split('=')[1]
    abtest = flwurlValsplit[7].split('=')[1]
    devid = flwurlValsplit[6].split('=')[1]
    HEADER = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-webp": "1",
      "Connection": "keep-alive",
      "Content-Length": "334",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "gw.fanli.com",
      "User-Agent": `Fanli/7.16.6.1 (iPhone10,2; iOS 14.2; zh_CN; ID:1-${uid}-${devid}-17-0; SCR:1242*2208-3.0)`,
    }
    dd = 0;
    O = (`${$.name + (i + 1)}🔔`);
    await console.log(`-------------------------\n\n🔔开始运行【${$.name+(i+1)}】`)
	ydBODY = flwydbodyVal.split('&');

        if (flwydbodyVal == '') {
            ydBODY.length = 0
            tt = 0
        } else tt = ydBODY.length * 1 - 0.5
	
	
	
    let cookie_is_live = await flwdl(i + 1); //登录
    if (!cookie_is_live) {
      continue;
    }
    //await flwsy();//余额
    if (CASH >= 0.3) {
      await flwhbcoin(); //天天领现金账户        
      await flwhb(); //天天领现金
      if ($.flwhbcoin.data && $.flwhbcoin.data.user_current_money >= CASH) {
        await flwhbtx(); //天天领现金提现
      }
    }
    await flwtask(); //任务列表	  
    if ($.flwtask.data && qw.status == 0) {
      dd = qw.new_point / 2
    } else if ($.flwtask.data && $.flwtask.data && sp.complete_count != 7) {
      dd = (7 - sp.complete_count) * 2
    }
    console.log(`📍本次运行等待${dd}秒`)
    if ($.flwtask.data && ms.status == 0) {
      await flwsign(); //签到
      await flwzrw(); //做任务
      await flwlrw(); //领任务
    }
    if ($.flwtask.data && sp.complete_count != 7) {
      await flwksp(); //看视频
      await flwlsp(); //领视频
    }
    if ($.flwtask.data && qw.status == 0) {
      await flwqw(); //趣味视频
    }
    await $.wait(dd * 1000);
    await flwzh(); //签到账户
    if (DHCASH >= 5) {
      await DHlist(); //兑换目录
      if (nowTimes.getHours() === 10 && $.flwzh.data && $.flwzh.data.ex_to_cash >= DHCASH && wu && wu.stock >= 5) {
        if (DHCASH == 5) {
          dhdh = wu.id
        } else if (DHCASH == 50) {
          dhdh = wushi.id
        } else if (DHCASH == 100) {
          dhdh = yibai.id
        }
        await DH(); //兑换
      }
    }
	await flwydzh();
	if (ydBODY.length != 0 && yd && jrydb3!=1200) {
            console.log(`【阅读统计】：共有${ydBODY.length}个body,预计运行${tt}秒\n`);
            $.message += `【阅读统计】：共有${ydBODY.length}个body,预计运行${tt}秒\n`
			  }
			
if (ydBODY.length != 0 && yd && jrydb3==1200) {
            console.log(`【阅读统计】：共有${ydBODY.length}个body,已完成\n`);
            $.message += `【阅读统计】：共有${ydBODY.length}个body,已完成\n`

        }

               
if (jrydb3!=1200){
            await read(); //刷阅读
            await $.wait(tt * 1000)
			 }
      
               
				if ($.flwydzh&&xjye3-0.12>=3){
                await flwydtx();
 }
	
	
  }
}
//通知
function msgShow() {
  return new Promise(async resolve => {
    if (notifyInterval != 1) {
      console.log($.name + '\n' + $.message);
    }
    if (notifyInterval == 1) {
      $.msg($.name, ``, $.message);
    }
    if (notifyInterval == 2 && (nowTimes.getHours() === 10 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
      $.msg($.name, ``, $.message);
    }
    if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 10 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
      $.msg($.name, ``, $.message);
    }
    if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 10 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 59))
      await notify.sendNotify($.name, $.message);
    resolve()
  })
}
//登录  
function flwdl(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: flwurlVal,
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 登录🚩: ${data}`);
          $.flwdl = JSON.parse(data);
          if ($.flwdl.status && $.flwdl.status == 1) {
            $.message += `\n${O}`;
            $.message += `\n========== 【${$.flwdl.data.username}】 ==========\n【账户总计】${$.flwdl.data.fanli_total}元\n`;
            resolve(true);
          } else {
            $.msg(O, time(Number(tts())) + "❌❌❌COOKIE失效");
            if ($.isNode()) {
              notify.sendNotify(O, time(Number(tts())) + "❌❌❌COOKIE失效");
            }
            resolve(false);
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//可提余额
function flwsy(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://m.fanli.com/center/ajaxGetUserAccountLog?month_str=all&type_str=all&p=1`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 可提余额🚩: ${data}`);
          $.flwsy = JSON.parse(data);
          if ($.flwsy.status && $.flwsy.status == 1) {
            $.message += `【已提现金】${$.flwdl.data.total}元\n【剩余现金】${$.flwdl.data.fanli_total-$.flwsy.data.total}元\n`
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//兑换目录
function DHlist(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/sign53023/ajaxInit`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 兑换目录🚩: ${data}`);
          $.DHlist = JSON.parse(data);
          if ($.DHlist.status && $.DHlist.status == 1) {
            wu = $.DHlist.data.rewards.find(item => item.sort === "31");
            wushi = $.DHlist.data.rewards.find(item => item.sort === "30");
            yibai = $.DHlist.data.rewards.find(item => item.sort === "29");
            if (wu && wu.stock >= 5) {
              $.message += '【' + wu.title + '】:库存' + wu.stock + '份\n'
            }
            if (wushi) {
              $.message += '【' + wushi.title + '】:库存' + wushi.stock + '份\n'
            }
            if (yibai) {
              $.message += '【' + yibai.title + '】:库存' + yibai.stock + '份\n'
            }
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//兑换
function DH(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/sign53023/ajaxConsumePointByExchangeRewards?id=${dhdh}&t=${tts()}`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 兑换🚩: ${data}`);
          $.DH = JSON.parse(data);
          if ($.DH.status && $.DH.status == 1) {
            $.message += '【兑换成功】:' + DHCASH + '元，剩余' + $.DH.data.point + '金币，预估' + $.DH.data.ex_to_cash + '元\n'
          } else $.message += '【兑换失败】:' + $.DH.info + '\n'
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//天天领现金账户信息  
function flwhbcoin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/h5/fanlishare20201212/ajaxInit`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 天天领现金账户信息🚩: ${data}`);
          $.flwhbcoin = JSON.parse(data);
          if ($.flwhbcoin.status && $.flwhbcoin.status == 1) {
            $.message += '【活动收益】:' + $.flwhbcoin.data.user_total_money + '元' + '\n' +
              '【活动余额】:' + $.flwhbcoin.data.user_current_money + '\n' +
              '【活动奖励】:' + $.flwhbcoin.data.get_money_76728 + '元' + '\n'
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//天天领现金  
function flwhb(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/h5/fanlishare20201212/ajaxDoTask76728`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 天天领现金🚩: ${data}`);
          $.flwhb = JSON.parse(data);
          if ($.flwhb.data && $.flwhb.data.remain_num_76728 > 0) {
            $.message += '【开启礼盒】🎉:' + $.flwhb.data.amount + '元' + '\n' +
              '【剩余礼盒】🎉:' + $.flwhb.data.remain_num_76728 + '个' + '\n'
          } else
            $.message += '【开启完毕】✖️:' + '礼盒已全部开启' + '\n'
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//天天领现金提现  
function flwhbtx(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/h5/fanlishare20201212/ajaxExchangeCash`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 天天领现金提现🚩: ${data}`);
          $.flwhbtx = JSON.parse(data);
          if ($.flwhbtx.status && $.flwhbtx.status == 1) {
            $.message += '【活动提现】🎉:提现成功,请到公众号领取' + '\n'
          } else
            $.message += '【活动提现】✖️:' + $.flwhbtx.info + '\n'
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//签到
function flwsign(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/sign53023/ajaxGetPointBySign?t=${tts()}`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 签到🚩: ${data}`);
          $.flwsign = JSON.parse(data);
          if ($.flwsign.status && $.flwsign.status == 1) {
            $.message += '【签到成功】🎉:获得' + $.flwsign.data.point + '金币\n'
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//账户  
function flwzh(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/sign53023/ajaxGetNewInitState`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 账户🚩: ${data}`);
          $.flwzh = JSON.parse(data);
          if ($.flwzh.status && $.flwzh.status == 1) {
            $.message += `【账户金币】:${$.flwzh.data.point}金币\n【预估现金】:${$.flwzh.data.ex_to_cash}元\n【今日已得】:${($.flwzh.data.get_point/900).toFixed(2)}元\n【今日未得】:${$.flwzh.data.no_cash}元\n【下个任务】:${$.flwzh.data.next_task.title}\n`
          } else
            $.message += '【账户】✖️:' + $.flwzh.info + '\n'
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//任务列表  
function flwtask(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: `https://huodong.fanli.com/sign53023/ajaxGetTasks`,
        headers: JSON.parse(flwheaderVal),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 任务列表🚩: ${data}`);
          $.flwtask = JSON.parse(data);
          if ($.flwtask.status && $.flwtask.status == 1) {
            zj = $.flwtask.data.tasks.find(item => item.id === '329');
            xyx = $.flwtask.data.tasks.find(item => item.id === '3');
            ksp = $.flwtask.data.tasks.find(item => item.id === '141');
            qw = $.flwtask.data.tasks.find(item => item.id === '83');
            bd = $.flwtask.data.tasks.find(item => item.id === '231');
            zjd = $.flwtask.data.tasks.find(item => item.id === '263');
            sy = $.flwtask.data.tasks.find(item => item.id === '313');
            wm = $.flwtask.data.tasks.find(item => item.id === '207');
            cj = $.flwtask.data.tasks.find(item => item.id === '241');
            tn = $.flwtask.data.tasks.find(item => item.id === '115');
            chf = $.flwtask.data.tasks.find(item => item.id === '251');
            sxj = $.flwtask.data.tasks.find(item => item.id === '249');
            gk = $.flwtask.data.tasks.find(item => item.id === '245');
            sp = $.flwtask.data.tasks.find(item => item.id === '17');
            ms = $.flwtask.data.tasks.find(item => item.id === '201');
            yd = $.flwtask.data.tasks.find(item => item.id === '111');
            zp = $.flwtask.data.tasks.find(item => item.id === '297');
            /*
            if (jd.status==1){$.message +=`【${jd.title}】:${jd.point}金币，已完成\n`}
            if (xyx.status==1){$.message +=`【${xyx.title}】:${xyx.point}金币，已完成\n`}
            if (ksp.status==1){$.message +=`【${ksp.title}】:${ksp.point}金币，已完成\n`}
            if (qw.status==1){$.message +=`【${qw.title}】:${qw.point}金币，已完成\n`}
            if (bd.status==1){$.message +=`【${bd.title}】:${bd.point}金币，已完成\n`}
            if (zjd.status==1){$.message +=`【${zjd.title}】:${zjd.point}金币，已完成\n`}
            if (sy.status==1){$.message +=`【${sy.title}】:${sy.point}金币，已完成\n`}
            if (wm.status==1){$.message +=`【${wm.title}】:${wm.point}金币，已完成\n`}
            if (cj.status==1){$.message +=`【${cj.title}】:${cj.point}金币，已完成\n`}
            if (tn.status==1){$.message +=`【${tn.title}】:${tn.point}金币，已完成\n`}
            if (chf.status==1){$.message +=`【${chf.title}】:${chf.point}金币，已完成\n`}
            if (sxj.status==1){$.message +=`【${sxj.title}】:${sxj.point}金币，已完成\n`}
            if (gk.status==1){$.message +=`【${gk.title}】:${gk.point}金币，已完成\n`}
            if (sp.status==1){$.message +=`【${sp.title}】:${sp.point}金币，已完成\n`}
            if (ms.status==1){$.message +=`【${ms.title}】:${ms.point}金币，已完成\n`}
            
            if (zp.status==1){$.message +=`【${zp.title}】:${zp.point}金币，已完成\n`}
            */
			
			if (yd.status==1){$.message +=`【${yd.title}】:${yd.point}金币，已完成\n`}
			
          } else
            $.message += '【任务列表】✖️:' + $.flwtask.info + '\n'
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//看视频
function flwksp(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        $.index = i + 1
        setTimeout(() => {
          flwspurlVal = `https://gw.fanli.com/app/v1/reward.htm?src=1&v=7.16.6.1&nt=wifi&abtest=${abtest}`
          let url = {
            url: flwspurlVal,
            headers: HEADER,
            body: flwspbodyVal,
          }
          $.post(url, async (err, resp, data) => {
            try {
              if (logs) $.log(`${O}, 视频🚩: ${data}`);
              $.flwksp = JSON.parse(data);
              if ($.flwksp.status && $.flwksp.status == 1) {
                console.log(`已观看第${i+1}次视频\n`);
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve()
            }
          })
        }, i * 2000);
      }
    }, timeout)
  })
}
//领视频
function flwlsp(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        $.index = i + 1
        setTimeout(() => {
          let url = {
            url: `https://huodong.fanli.com/sign53023/ajaxGetPointByCompleteTask?id=17&content=&t=${tts()}&start_time=&source=1`,
            headers: JSON.parse(flwheaderVal),
          }
          $.get(url, async (err, resp, data) => {
            try {
              if (logs) $.log(`${O}, 领视频🚩: ${data}`);
              $.flwlsp = JSON.parse(data);
              if ($.flwlsp.status && $.flwlsp.status == 1) {
                console.log(`已领取第${i+1}次视频奖励，${$.flwlsp.data.point}金币\n`);
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve()
            }
          })
        }, i * 2010);
      }
    }, timeout)
  })
}
//趣味视频
function flwqw(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 200; i++) {
        $.index = i + 1
        setTimeout(() => {
          flwqwurlVal = `https://gw.fanli.com/app/v1/videofeed/report.htm?uid=${uid}&token=${token}&nonce=&t=${ts()}&pageType=0&sn=${sn}&src=1&v=7.16.6.1&abtest=${abtest}`
          let url = {
            url: flwqwurlVal,
            headers: HEADER,
            body: flwqwbodyVal,
          }
          $.post(url, async (err, resp, data) => {
            try {
              if (logs) $.log(`${O}, 趣味视频🚩: ${data}`);
              $.flwqw = JSON.parse(data);
              if ($.flwqw.status && $.flwqw.status == 1) {
                console.log(`已观看第${i+1}次趣味视频，共领取${(i+1)*2}金币\n`);
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve()
            }
          })
        }, i * 1000);
      }
    }, timeout)
  })
}
//做日常任务
function flwzrw(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < id.length; i++) {
        setTimeout(() => {
          $.index = i + 1
          iid = id[i]
          let url = {
            url: `https://huodong.fanli.com/sign53023/ajaxReportOtherTaskStatus?id=${iid}`,
            headers: JSON.parse(flwheaderVal),
          }
          $.get(url, async (err, resp, data) => {
            try {
              if (logs) $.log(`${O}, 日常任务🚩: ${data}`);
              $.flwzrw = JSON.parse(data);
              if ($.flwzrw.status && $.flwzrw.status == 1) {
                console.log(`已完成第${i+1}次任务\n`);
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve()
            }
          })
        }, i * 1000);
      }
    }, timeout)
  })
}
//领日常任务
function flwlrw(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < id.length; i++) {
        setTimeout(() => {
          $.index = i + 1
          iid = id[i]
          let url = {
            url: `https://huodong.fanli.com/sign53023/ajaxGetPointByCompleteTask?id=${iid}&content=&t=${tts()}&start_time=&source=`,
            headers: JSON.parse(flwheaderVal),
          }
          $.get(url, async (err, resp, data) => {
            try {
              if (logs) $.log(`${O}, 领日常任务🚩: ${data}`);
              $.flwlrw = JSON.parse(data);
              if ($.flwlrw.status && $.flwlrw.status == 1) {
                console.log(`已领取第${i+1}次任务奖励，领取${$.flwlrw.data.point}金币\n`);
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve()
            }
          })
        }, i * 1010);
      }
    }, timeout)
  })
}

//刷阅读
function read(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            var inss = 0;
            var ins = 0; 
            for (let i = 0; i < ydBODY.length; i++) {
                setTimeout(() => {
                    let url = {
                        url: `https://gw.fanli.com/app/v1/news/read.htm?src=1&v=7.16.19.1&abtest=${abtest}`,
                        headers: HEADER,
                        body: `${ydBODY[i]}`,
                    }
                    $.post(url, async (err, resp, data) => {
                        try {
                            if (logs) $.log(`${O}, 刷阅读🚩: ${data}`);
                            $.read = JSON.parse(data);
                            if ($.read.data && $.read.status == 1&&$.read.data.rewards) {
                                console.log(`【刷阅读】：开始领取第${i+1}次阅读奖励,获得${$.read.data.rewards}阅读币,等待1秒继续\n`);
                                inss += $.read.data.rewards;
                                ins += 1;
                            }
                            if ($.read.status == 1&&!$.read.data.rewards) {
                                console.log(`【刷阅读】：开始领取第${i+1}次阅读奖励,重复领取,等待1秒继续\n`);
                            }
                        } catch (e) {
                            $.logErr(e, resp);
                        } finally {
                            resolve()
                        }
                    })
                }, i * 1000);
            }
            setTimeout(() => {
                if ($.read.status) {
                    console.log(`【刷阅读】：共领取${ins}次阅读奖励,共${inss}阅读币\n`);
                    $.message += `【刷阅读】：共领取${ins}次阅读奖励,共${inss}阅读币\n`
                }
                
            }, ydBODY.length * 1000-700)
        }, timeout)
    })
}

//阅读账户
function flwydzh(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
header=flwheaderVal.replace(`huodong.fanli.com`, `finder.fanli.com`)	

      let url = {
        url: `https://gw.fanli.com/app/v1/news/header.htm?uid=${uid}&token=${token}&tpl=&src=1&v=7.16.19.1&abtest=${abtest}`,
        headers: HEADER,
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 阅读账户🚩: ${data}`);
          $.flwydzh = JSON.parse(data);
          if ($.flwydzh.status && $.flwydzh.status == 1) {
			  jryd1 = $.flwydzh.data.header.dlData.find(item => item.name === 'tp_todayReadedTitle');
			  jryd2 = $.flwydzh.data.header.dlData.find(item => item.name === 'tp_todayReadedContent');
			  jrydb1 = $.flwydzh.data.header.dlData.find(item => item.name === 'tp_todayReadCoinTitle');
			  jrydb2 = $.flwydzh.data.header.dlData.find(item => item.name === 'tp_todayReadCoinContent');
			  xjye1 = $.flwydzh.data.header.dlData.find(item => item.name === 'tp_withdrawCashesTitle');
			  xjye2 = $.flwydzh.data.header.dlData.find(item => item.name === 'tp_withdrawCashesContent');
			  
			  jryd3 = jryd2.richTextInfo.split('<font')[0];
			  jrydb3 = jrydb2.richTextInfo.split('<font')[0];
			  xjye3 = xjye2.richTextInfo.split('<font')[0];
			  
			  
            console.log(`【${jryd1.text}】：${jryd3}分钟\n【${jrydb1.text}】：${jrydb3}币\n【${xjye1.text}】：${xjye3}元\n`);
				
           $.message += `【${jryd1.text}】：${jryd3}分钟\n【${jrydb1.text}】：${jrydb3}币\n【${xjye1.text}】：${xjye3}元\n`
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}


//阅读提现
function flwydtx(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {		
		header=flwheaderVal.replace(/huodong.fanli.com/g, `finder.fanli.com`)		
      let url = {
        url: `https://finder.fanli.com/news/index/ajaxTixian?amount=3`,
        headers: JSON.parse(header),
      }
      $.get(url, async (err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 阅读提现🚩: ${data}`);
          $.flwydtx = JSON.parse(data);
          if ($.flwydtx.status && $.flwydtx.status == 1) {
            $.message += '【阅读提现】🎉:成功提现3元\n'
          }
		  if ($.flwydtx.status && $.flwydtx.status == 0) {
            $.message += '【阅读提现】🎉:'+$.flwydtx.info+'\n'
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}

// prettier-ignore
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, ``).trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ``;
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, ``) : e
        } catch (t) {
          e = ``
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t) {
      let e = {
        "M+": (new Date).getMonth() + 1,
        "d+": (new Date).getDate(),
        "H+": (new Date).getHours(),
        "m+": (new Date).getMinutes(),
        "s+": (new Date).getSeconds(),
        "q+": Math.floor(((new Date).getMonth() + 3) / 3),
        S: (new Date).getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + ``).substr(4 - RegExp.$1.length)));
      for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr((`` + e[s]).length)));
      return t
    }
    msg(e = t, s = ``, i = ``, r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
      let h = [``, "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
