
/* 参考 */
/* https://raw.githubusercontent.com/fishingworld/something/main/PanelScripts/surgepro_reloadprofile.js */
/* https://raw.githubusercontent.com/smartmimi/conf/master/surge/functionstatus.js */

const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
}

!(async () => {
/* 定义图标 */
let params = getParams($argument)
/* 运行时间获取 */
let traffic = (await httpAPI("/v1/traffic","GET"))
let dateNow = new Date()
let dateTime = Math.floor(traffic.startTime*1000)
let startTime = timeTransform(dateNow,dateTime)
/* MitM+Rewrite+Scripting状态获取 */
let mitm_status = (await httpAPI("/v1/features/mitm","GET"));
let rewrite_status = (await httpAPI("/v1/features/rewrite","GET"));
let scripting_status = (await httpAPI("/v1/features/scripting","GET"));
/* 流媒体检测 */
let meiti = {
    yt_content: '',
  }
  await Promise.all(check_youtube_premium())
    .then((result) => {
      let yt_content = result.join('   ')
      meiti['yt_content'] = yt_content
    })

if ($trigger == "button") await httpAPI("/v1/profiles/reload");

  $done({
      title:"𝗦𝗨𝗥𝗚𝗘 𝗣𝗥𝗢",
      content:`𝗘𝗿𝗱𝗼𝗻𝗴𝗖𝗵𝗮𝗻 𝗟𝗮𝘇𝘆 𝗖𝗢𝗡𝗙©️\n`+
	  `--------------\n`+
	  `@t.me/erdongchan\n`+
	  `--------------\n`+
	  `已持续运行: ${startTime}\n`+
	  `--------------\n`+
    	  `(meiti)\n`+
   	  `--------------\n`+
	  `MitM:`+icon_status(mitm_status.enabled)+`  Rewrite:`+icon_status(rewrite_status.enabled)+`  Scripting:`+icon_status(scripting_status.enabled),
		icon: params.icon,
		"icon-color":params.color
    });

})();

async function check_youtube_premium() {
  let inner_check = () => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.youtube.com/premium',
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        if (error != null || response.status !== 200) {
          reject('Error')
          return
        }

        if (data.indexOf('Premium is not available in your country') !== -1) {
          resolve('Not Available')
          return
        }

        let region = ''
        let re = new RegExp('"countryCode":"(.*?)"', 'gm')
        let result = re.exec(data)
        if (result != null && result.length === 2) {
          region = result[1]
        } else if (data.indexOf('www.google.cn') !== -1) {
          region = 'CN'
        } else {
          region = 'US'
        }
        resolve(region)
      })
    })
  }

  let youtube_check_result = ''

  await inner_check()
    .then((code) => {
      if (code === 'Not Available') {
        youtube_check_result += '油管未解锁'
      } else {
        youtube_check_result += '油管解锁：' + code.toUpperCase()
      }
    })
    .catch((error) => {
      youtube_check_result += '检测失败'
    })

  return youtube_check_result
}


function timeTransform(dateNow,dateTime) {
let dateDiff = dateNow - dateTime;
let days = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
let hours=Math.floor(leave1/(3600*1000))//计算出小时数
//计算相差分钟数
let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
//计算相差秒数
let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
let seconds=Math.round(leave3/1000)

if(days==0){

	if(hours==0){
	if(minutes==0)return(`${seconds}秒`);
	return(`${minutes}分${seconds}秒`)
	}
	return(`${hours}时${minutes}分${seconds}秒`)
	}else {
	return(`${days}天${hours}时${minutes}分`)
	}

}

function icon_status(status){
  if (status){
    return "\u2611";
  } else {
      return "\u2612"
    }
}

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
