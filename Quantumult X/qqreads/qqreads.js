/* 来源于网络


⚠️cookie获取方法：

进 https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a

进书库⚠️选择一本书,看10秒以下,然后退出，获取时长url和时长header以及更新body，看书一定不能超过10秒



Secrets对应关系如下，多账号默认换行

qqreadbodyVal         👉   QQREAD_BODY
qqreadtimeurlVal      👉   QQREAD_TIMEURL
qqreadtimeheaderVal   👉   QQREAD_TIMEHD
CASH                  👉   QQREAD_CASH  提现标准 可设置0 1 2 10 30 50 100 设置0关闭



⚠️宝箱奖励为20分钟一次，自己根据情况设置定时，建议设置11分钟一次

hostname=mqqapi.reader.qq.com

############## 圈x

#企鹅读书获取更新body
https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track url script-request-body qqreads.js

#企鹅读书获取时长cookie
https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? url script-request-header qqreads.js

############## surge

//企鹅读书获取更新body
企鹅读书获取更新body = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track,script-path=qqreads.js,

//企鹅读书获取时长cookie
企鹅读书获取时长cookie = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid?,script-path=qqreads.js,


*/

const jsname = "企鹅读书";
const $ = Env(jsname);
$.idx = ($.idx = ($.getval("qeSuffix") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : "";

let tz = "";
let kz = "";
let task = "";
let CASH = "";
let config = "";
let K = 0;
let COOKIES_SPLIT = "";
let dk,sp,ljyd,ydrw,wktime;


const logs = 0; // 0为关闭日志，1为开启
const notifyInterval = 3;
// 0为关闭通知，1为所有通知，2为宝箱领取成功通知，3为宝箱每15次通知一次

const dd = 1; // 单次任务延迟,默认1秒
const maxtime = 10; // 每日上传时长限制，默认12小时
const wktimess = 1200; // 周奖励领取标准，默认1200分钟
const nowTimes = new Date(
  new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);



const qqreadbdArr = [];
let qqreadbodyVal = "";
const qqreadtimeurlArr = [];
let qqreadtimeurlVal = "";
const qqreadtimehdArr = [];
let qqreadtimeheaderVal = "";
let qqreadBD = [];
let qqreadtimeURL = [];
let qqreadtimeHD = [];

if ($.isNode()) {
  // 没有设置 QQREAD_CASH 则默认为 0 不提现
  CASH = process.env.QQREAD_CASH || 0;

  // 自定义多 cookie 之间连接的分隔符，默认为 \n 换行分割，不熟悉的不要改动和配置，为了兼容本地 node 执行
  COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";

  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
  if (
    process.env.QQREAD_BODY &&
    process.env.QQREAD_BODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    qqreadBD = process.env.QQREAD_BODY.split(COOKIES_SPLIT);
  } else {
    qqreadBD = process.env.QQREAD_BODY.split();
  }

  if (
    process.env.QQREAD_TIMEURL &&
    process.env.QQREAD_TIMEURL.indexOf(COOKIES_SPLIT) > -1
  ) {
    qqreadtimeURL = process.env.QQREAD_TIMEURL.split(COOKIES_SPLIT);
  } else {
    qqreadtimeURL = process.env.QQREAD_TIMEURL.split();
  }

  if (
    process.env.QQREAD_TIMEHD &&
    process.env.QQREAD_TIMEHD.indexOf(COOKIES_SPLIT) > -1
  ) {
    qqreadtimeHD = process.env.QQREAD_TIMEHD.split(COOKIES_SPLIT);
  } else {
    qqreadtimeHD = process.env.QQREAD_TIMEHD.split();
  }
}

if ($.isNode()) {
  Object.keys(qqreadBD).forEach((item) => {
    if (qqreadBD[item]) {
      qqreadbdArr.push(qqreadBD[item]);
    }
  });
  Object.keys(qqreadtimeURL).forEach((item) => {
    if (qqreadtimeURL[item]) {
      qqreadtimeurlArr.push(qqreadtimeURL[item]);
    }
  });
  Object.keys(qqreadtimeHD).forEach((item) => {
    if (qqreadtimeHD[item]) {
      qqreadtimehdArr.push(qqreadtimeHD[item]);
    }
  });
} else {
  qqreadbdArr.push($.getdata("qqreadbd"));
  qqreadtimeurlArr.push($.getdata("qqreadtimeurl"));
  qqreadtimehdArr.push($.getdata("qqreadtimehd"));
  // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
  if ("qeCASH") {
    CASH = $.getval("qeCASH");
  } else CASH = 0;
  const qeCount = ($.getval("qeCount") || "1") - 0;
  for (let i = 2; i <= qeCount; i++) {
    if ($.getdata(`qqreadbd${i}`)) {
      qqreadbdArr.push($.getdata(`qqreadbd${i}`));
      qqreadtimeurlArr.push($.getdata(`qqreadtimeurl${i}`));
      qqreadtimehdArr.push($.getdata(`qqreadtimehd${i}`));
    }
  }
}

// 今日0点时间戳
if ($.isNode()) {
  daytime =
    new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
} else {
  daytime = new Date(new Date().toLocaleDateString()).getTime();
}


if ((isGetCookie = typeof $request !== "undefined")) {
  GetCookie();
  $.done();
}


function GetCookie() {
  if (
      $request && $request.url.indexOf("addReadTimeWithBid?") >= 0 && 
      $request.url.indexOf("book-category") >= 0
    ) {
    const qqreadtimeurlVal = $request.url;
    if (qqreadtimeurlVal) $.setdata(qqreadtimeurlVal, `qqreadtimeurl${$.idx}`);
    $.log(
      `[${
        jsname + $.idx
      }] 获取时长url: 成功,qqreadtimeurlVal: ${qqreadtimeurlVal}`
    );
    $.msg(jsname + $.idx, `获取时长url: 成功🎉`, ``);
    const qqreadtimeheaderVal = JSON.stringify($request.headers);
    if (qqreadtimeheaderVal)
      $.setdata(qqreadtimeheaderVal, `qqreadtimehd${$.idx}`);
    $.log(
      `[${
        jsname + $.idx
      }] 获取时长header: 成功,qqreadtimeheaderVal: ${qqreadtimeheaderVal}`
    );
    $.msg(jsname + $.idx, `获取时长header: 成功🎉`, ``);
  } else if (
    $request &&
    $request.body.indexOf("bookDetail_bottomBar_read_C") >= 0 &&
    $request.body.indexOf("bookLib2_bookList_bookClick_C") >= 0 &&
    $request.body.indexOf("bookRead_show_I") >= 0 &&
    $request.body.indexOf("topBar_left_back_C") < 0 &&
    $request.body.indexOf("bookRead_dropOut_shelfYes_C") < 0
  ) {
    const qqreadbodyVal = $request.body;
    if (qqreadbodyVal) $.setdata(qqreadbodyVal, `qqreadbd${$.idx}`);
    $.log(
      `[${jsname + $.idx}] 获取更新body: 成功,qqreadbodyVal: ${qqreadbodyVal}`
    );
    $.msg(jsname + $.idx, `获取更新body: 成功🎉`, ``);
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
  `============ 共 ${qqreadbdArr.length} 个${jsname}账号：预计运行 ${
    qqreadbdArr.length * 13
  } 秒 =============\n`
);

console.log(`============ 提现标准为：${CASH} =============\n`);

all();
function all() {
  if (!qqreadbdArr[0]) {
    $.msg(
      jsname,
      "⚠️提示：您还未获取cookie,请点击前往获取cookie\n",
      "https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a",
      { "open-url": "https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a" }
    );
    $.done();
  }

  qqreadbodyVal = qqreadbdArr[K];
  qqreadtimeurlVal = qqreadtimeurlArr[K];
  qqreadtimeheaderVal = qqreadtimehdArr[K];
  O = `${jsname + (K + 1)}🔔`;
  for (let i = 0; i < 13; i++) {
    (function (i) {
      setTimeout(
        function () {
          if (i == 0) qqreadinfo(); // 用户名
          if (i == 1) {
            qqreadwktime(); // 周时长查询
            qqreadconfig(); // 时长查询
            qqreadtrack(); // 更新
          } else if (i == 2) {
            qqreadtask(); // 任务列表
            if (
              config.data &&
              config.data.pageParams.todayReadSeconds / 3600 <= maxtime
            )
              qqreadtime(); // 上传时长
          } else if (i == 3) {
            if (
              wktime &&
              wktime.data &&
              wktime.data.readTime >= wktimess &&
              wktime.data.readTime <= 1250
            ) {
              qqreadpick(); // 领周时长奖励
            }
            if (task.data && ljyd.doneFlag == 0) qqreaddayread(); // 阅读任务
            if (
              ydrw &&
              ydrw.doneFlag == 0 &&
              config.data &&
              config.data.pageParams.todayReadSeconds / 60 >= 1
            )
              qqreadssr1(); // 阅读金币1
            if (task.data && dk.doneFlag == 0) {
              qqreadsign(); // 金币签到
              qqreadtake(); // 阅豆签到
            }
            if (task.data && sp.doneFlag == 0) qqreadvideo(); // 视频任务
          } else if (i == 7) {
            if (task.data && task.data.treasureBox.doneFlag == 0) qqreadbox(); // 宝箱
            if (
              ydrw &&
              ydrw.doneFlag == 0 &&
              config.data &&
              config.data.pageParams.todayReadSeconds / 60 >= 30
            )
              qqreadssr2(); // 阅读金币2
            if (task.data && dk.doneFlag == 0) qqreadsign2(); // 签到翻倍
          } else if (
            i == 8 &&
            CASH >= 1 &&
            task.data.user.amount >= CASH * 10000 &&
            nowTimes.getHours() == 23
          ) {
            qqreadwithdraw(); // 现金提现
          } else if (i == 9 &&
            nowTimes.getHours() >= 6
          ) {
            getAmounts(); // 今日收益累计
          } else if (i == 11) {
            if (task.data && task.data.treasureBox.videoDoneFlag == 0)
              qqreadbox2(); // 宝箱翻倍
            if (
              ydrw &&
              ydrw.doneFlag == 0 &&
              config.data &&
              config.data.pageParams.todayReadSeconds / 60 >= 30
            )
              qqreadssr3(); // 阅读金币3
          } else if (i == 12) {
            if (K < qqreadbdArr.length - 1) {
              K += 1;
              all();
            } else if (K == qqreadbdArr.length - 1) {
              showmsg(); // 通知
              $.done();
            }
          }
        },

        (i + 1) * dd * 1000
      );
    })(i);
  }
}

function showmsg() {
  console.log(
    `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000
    ).toLocaleString()} =====================\n`
  );
  if (
    $.isNode() &&
    (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) &&
    nowTimes.getMinutes() >= 0 &&
    nowTimes.getMinutes() <= 30
  ) {
    notify.sendNotify(jsname, kz);
  }
  if (notifyInterval != 1) console.log(tz); // 无通知时，打印通知
  if (notifyInterval == 1) $.msg(jsname, "", tz);
  // 显示所有通知
  else if (
    notifyInterval == 2 &&
    task.data &&
    task.data.treasureBox.doneFlag == 0
  )
    $.msg(jsname, "", tz);
  // 宝箱领取成功通知
  else if (
    (notifyInterval == 3 && task.data && task.data.treasureBox.count == 0) ||
    task.data.treasureBox.count == 15 ||
    task.data.treasureBox.count == 30 ||
    task.data.treasureBox.count == 45 ||
    task.data.treasureBox.count == 60
  )
    $.msg(jsname, "", tz); // 宝箱每15次通知一次
}
// 任务列表
function qqreadtask() {
  return new Promise((resolve, reject) => {
    const toqqreadtaskurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/page?fromGuid=",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadtaskurl, (error, response, data) => {
      if (logs) $.log(`${O}, 任务列表: ${data}`);
      task = JSON.parse(data);
      dk = task.data.taskList.find((item) => item.type === 200);
      ljyd = task.data.taskList.find((item) => item.type === 210);
      ydrw = task.data.taskList.find((item) => item.type === 220);
      sp = task.data.taskList.find((item) => item.type === 230);

      if (task.data.invite.nextInviteConfig) {
        tz +=
          `【现金余额】:${(task.data.user.amount / 10000).toFixed(2)}元\n` +
          `【第${task.data.invite.issue}期】:时间${task.data.invite.dayRange}\n` +
          ` 已邀请${task.data.invite.inviteCount}人，再邀请${task.data.invite.nextInviteConfig.count}人获得${task.data.invite.nextInviteConfig.amount}金币\n` +
          `【${dk.title}】:${dk.amount}金币,${dk.actionText}\n` +
          `【${ljyd.title}】:${ljyd.amount}金币,${ljyd.actionText}\n` +
          `【${ydrw.title}】:${ydrw.amount}金币,${ydrw.actionText}\n` +
          `【${sp.title}】:${sp.amount}金币,${sp.actionText}\n` +
          `【宝箱任务${task.data.treasureBox.count + 1}】:${
            task.data.treasureBox.tipText
          }\n` +
          `【${task.data.fans.title}】:${task.data.fans.fansCount}个好友,${task.data.fans.todayAmount}金币\n`;
      }

      kz +=
        `【现金余额】:${(task.data.user.amount / 10000).toFixed(2)}元\n` +
        `【宝箱任务${task.data.treasureBox.count + 1}】:${
          task.data.treasureBox.timeInterval / 1000
        }秒后领取\n` +
        `【已开宝箱】:${task.data.treasureBox.count}个\n`;

      resolve();
    });
  });
}
// 统计金币
async function getAmounts() {
  let page = 1
  let amounts = 0
  while (true) {
    const { total, isEnd } = await getTodayAmount(page)
    amounts += total
    if (isEnd) {
      break
    } else {
      page++
      await $.wait(200)
    }
  }
  if (logs) $.log(`${O}, 今日收益: ${amounts}金币,约${(amounts / 10000.0).toFixed(2)}元.`);
  tz += `【今日收益】:获得${amounts}金币,约${(amounts / 10000.0).toFixed(2)}元.\n`
  kz += `【今日收益】:获得${amounts}金币,约${(amounts / 10000.0).toFixed(2)}元.\n`
}

function getTodayAmount(page = 1) {
  return new Promise((r, j) => {
    const options = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/trans/list?pn=" + page,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    }
    $.get(options, (error, response, data) => {
      const obj = JSON.parse(data)
      let isEnd = obj.data.list.length == 0
      let total = 0
      for (let index = 0; index < obj.data.list.length; index++) {
        const element = obj.data.list[index];
        if (element.createTime < daytime){
          isEnd = true
          break
        }
        total += element.amount
      }
      r({ total, isEnd })
    })
  })
}
// 更新
function qqreadtrack() {
  return new Promise((resolve, reject) => {
    const body = qqreadbodyVal.replace(new RegExp(/"dis":[0-9]{13}/), `"dis":${new Date().getTime()}`)
    const toqqreadtrackurl = {
      url: "https://mqqapi.reader.qq.com/log/v4/mqq/track",
      headers: JSON.parse(qqreadtimeheaderVal),
      body: body,
      timeout: 60000,
    };
    $.post(toqqreadtrackurl, (error, response, data) => {
      if (logs) $.log(`${O}, 更新: ${data}`);
      let track = JSON.parse(data);
var date = new Date(JSON.parse(qqreadbodyVal).dataList[0].dis);
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds();
time=Y+M+D+h+m+s;
      tz += `【数据更新】:更新${track.msg},\n【cookie获取时间】${time}\n`;
      kz += `【数据更新】:更新${track.msg},\n【cookie获取时间】${time}\n`;
      resolve();
    });
  });
}
// 提现
function qqreadwithdraw() {
  return new Promise((resolve, reject) => {
    const toqqreadwithdrawurl = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/withdraw?amount=${
        CASH * 10000
      }`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadwithdrawurl, (error, response, data) => {
      if (logs) $.log(`${O}, 提现: ${data}`);
      const withdraw = JSON.parse(data);
      if (withdraw.data.code == 0) {
        tz += `【现金提现】:成功提现${CASH}元\n`;
        kz += `【现金提现】:成功提现${CASH}元\n`;
      }
      resolve();
    });
  });
}
// 用户名
function qqreadinfo() {
  return new Promise((resolve, reject) => {
    const toqqreadinfourl = {
      url: "https://mqqapi.reader.qq.com/mqq/user/init",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadinfourl, (error, response, data) => {
      if (logs) $.log(`${O}, 用户名: ${data}`);
      info = JSON.parse(data);
      if (!info.data.user)
        $.msg(
          `【${O}】`,
          "COOKE失效：❌❌❌请点击前往获取cookie\n",
          "https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a",
          {
            "open-url":
              "https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a",
          }
        );
      if (info.data.user.nickName) {
        kz += `\n========== 【${info.data.user.nickName}】 ==========\n`;
        tz += `\n========== 【${info.data.user.nickName}】 ==========\n`;
      }
      resolve();
    });
  });
}
// 阅豆签到
function qqreadtake() {
  return new Promise((resolve, reject) => {
    const toqqreadtakeurl = {
      url: "https://mqqapi.reader.qq.com/mqq/sign_in/user",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadtakeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅豆签到: ${data}`);
      take = JSON.parse(data);
      if (take.data.takeTicket > 0) {
        tz += `【阅豆签到】:获得${take.data.takeTicket}豆\n`;
      }
      resolve();
    });
  });
}
// 阅读时长任务
function qqreadconfig() {
  return new Promise((resolve, reject) => {
    const toqqreadconfigurl = {
      url:
        "https://mqqapi.reader.qq.com/mqq/page/config?router=%2Fpages%2Fbook-read%2Findex&options=",
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadconfigurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长查询: ${data}`);
      config = JSON.parse(data);
      if (config.code == 0) {
        tz += `【时长查询】:今日阅读${(
          config.data.pageParams.todayReadSeconds / 60
        ).toFixed(0)}分钟\n`;
      }
      resolve();
    });
  });
}
// 阅读时长
function qqreadtime() {
  return new Promise((resolve, reject) => {
    do TIME = Math.floor(Math.random() * 35);
    while (TIME < 25);
    const toqqreadtimeurl = {
      url: qqreadtimeurlVal.replace(/readTime=/g, `readTime=${TIME}`),
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadtimeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长: ${data}`);
      const time = JSON.parse(data);
      if (time.code == 0) {
        tz += `【阅读时长】:上传${(TIME / 6).toFixed(1)}分钟\n`;
      }
      resolve();
    });
  });
}
// 阅读金币1
function qqreadssr1() {
  return new Promise((resolve, reject) => {
    const toqqreadssr1url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=30`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadssr1url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币奖励1: ${data}`);
      ssr1 = JSON.parse(data);
      if (ssr1.data.amount > 0) {
        tz += `【阅读金币1】获得${ssr1.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 阅读金币2
function qqreadssr2() {
  return new Promise((resolve, reject) => {
    const toqqreadssr2url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=300`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadssr2url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币奖励2: ${data}`);
      ssr2 = JSON.parse(data);
      if (ssr2.data.amount > 0) {
        tz += `【阅读金币2】获得${ssr2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 阅读金币3
function qqreadssr3() {
  return new Promise((resolve, reject) => {
    const toqqreadssr3url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=1800`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadssr3url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币奖励3: ${data}`);
      ssr3 = JSON.parse(data);
      if (ssr3.data.amount > 0) {
        tz += `【阅读金币3】获得${ssr3.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 金币签到
function qqreadsign() {
  return new Promise((resolve, reject) => {
    const toqqreadsignurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadsignurl, (error, response, data) => {
      if (logs) $.log(`${O}, 金币签到: ${data}`);
      sign = JSON.parse(data);
      if (sign.code == 0) {
        tz += `【金币签到】:获得${sign.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 金币签到翻倍
function qqreadsign2() {
  return new Promise((resolve, reject) => {
    const toqqreadsign2url = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadsign2url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币签到翻倍: ${data}`);
      sign2 = JSON.parse(data);
      if (sign2.code == 0) {
        tz += `【签到翻倍】:获得${sign2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 每日阅读
function qqreaddayread() {
  return new Promise((resolve, reject) => {
    const toqqreaddayreadurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/read_book",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddayreadurl, (error, response, data) => {
      if (logs) $.log(`${O}, 每日阅读: ${data}`);
      dayread = JSON.parse(data);
      if (dayread.code == 0) {
        tz += `【每日阅读】:获得${dayread.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 视频奖励
function qqreadvideo() {
  return new Promise((resolve, reject) => {
    const toqqreadvideourl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/watch_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadvideourl, (error, response, data) => {
      if (logs) $.log(`${O}, 视频奖励: ${data}`);
      video = JSON.parse(data);
      if (video.code == 0) {
        tz += `【视频奖励】:获得${video.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 宝箱奖励
function qqreadbox() {
  return new Promise((resolve, reject) => {
    const toqqreadboxurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadboxurl, (error, response, data) => {
      if (logs) $.log(`${O}, 宝箱奖励: ${data}`);
      box = JSON.parse(data);
      if (box.code == 0) {
        tz += `【宝箱奖励${box.data.count}】:获得${box.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 宝箱奖励翻倍
function qqreadbox2() {
  return new Promise((resolve, reject) => {
    const toqqreadbox2url = {
      url:
        "https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadbox2url, (error, response, data) => {
      if (logs) $.log(`${O}, 宝箱奖励翻倍: ${data}`);
      box2 = JSON.parse(data);
      if (box2.code == 0) {
        tz += `【宝箱翻倍】:获得${box2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 本周阅读时长
function qqreadwktime() {
  return new Promise((resolve, reject) => {
    const toqqreadwktimeurl = {
      url: `https://mqqapi.reader.qq.com/mqq/v1/bookShelfInit`,
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadwktimeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长: ${data}`);
      wktime = JSON.parse(data);
      if (wktime.code == 0) {
        tz += `【本周阅读时长】:${wktime.data.readTime}分钟\n`;
      }
      resolve();
    });
  });
}
// 本周阅读时长奖励任务
function qqreadpick() {
  return new Promise((resolve, reject) => {
    const toqqreadpickurl = {
      url: `https://mqqapi.reader.qq.com/mqq/pickPackageInit`,
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadpickurl, (error, response, data) => {
      if (logs) $.log(`${O},周阅读时长奖励任务: ${data}`);
      pick = JSON.parse(data);
      if (pick.data[7].isPick == true) tz += "【周时长奖励】:已全部领取\n";
      for (let i = 0; i < pick.data.length; i++) {
        setTimeout(() => {
          const pickid = pick.data[i].readTime;
          const Packageid = ["10", "10", "20", "30", "50", "80", "100", "120"];
          const toqqreadPackageurl = {
            url: `https://mqqapi.reader.qq.com/mqq/pickPackage?readTime=${pickid}`,
            headers: JSON.parse(qqreadtimeheaderVal),
            timeout: 60000,
          };
          $.get(toqqreadPackageurl, (error, response, data) => {
            if (logs) $.log(`${O}, 领周阅读时长: ${data}`);
            Package = JSON.parse(data);
            if (Package.code == 0)
              tz += `【周时长奖励${i + 1}】:领取${Packageid[i]}阅豆\n`;
          });
        }, i * 100);
      }
    });
    resolve();
  });
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
