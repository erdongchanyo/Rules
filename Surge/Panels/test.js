const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
}

;(async () => {
  let panel_result = {
    title: '𝗦𝗨𝗥𝗚𝗘 𝗣𝗥𝗢',
    content: '',
    icon: 'play.circle',
    'icon-color': '#00BC12',
  }
  await Promise.all([check_netflix(), check_youtube_premium()])
    .then((result) => {
      let content = `𝗘𝗿𝗱𝗼𝗻𝗴𝗖𝗵𝗮𝗻 𝗟𝗮𝘇𝘆 𝗖𝗢𝗡𝗙©️\n`+
          `result.join('   ')\n`,
      panel_result['content'] = content
    })
    .finally(() => {
      $done(panel_result)
    })
})()

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

async function check_netflix() {
  let inner_check = (filmId) => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.netflix.com/title/' + filmId,
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        if (error != null) {
          reject('Error')
          return
        }

        if (response.status === 403) {
          reject('Not Available')
          return
        }

        if (response.status === 404) {
          resolve('Not Found')
          return
        }

        if (response.status === 200) {
          let url = response.headers['x-originating-url']
          let region = url.split('/')[3]
          region = region.split('-')[0]
          if (region == 'title') {
            region = 'us'
          }
          resolve(region)
          return
        }

        reject('Error')
      })
    })
  }

  let netflix_check_result = ''

  await inner_check(81215567)
    .then((code) => {
      if (code === 'Not Found') {
        return inner_check(80018499)
      }
      netflix_check_result += '奈飞解锁：' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .then((code) => {
      if (code === 'Not Found') {
        return Promise.reject('Not Available')
      }

      netflix_check_result += '奈飞自制 ➟ ' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .catch((error) => {
      if (error === 'BreakSignal') {
        return
      }
      if (error === 'Not Available') {
        netflix_check_result += '奈飞无法观看'
        return
      }
      netflix_check_result += '检测失败'
    })

  return netflix_check_result
}
