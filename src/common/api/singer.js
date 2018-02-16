import jsonp from '../js/jsonp'
export function getSinger () {
  const URL = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const PARAMS = {channel: 'singer', key: 'all_all_all', g_tk: 1858198544, format: 'jsonp', outCharset: 'utf-8', platform: 'yqq', page: 'list', hostUin: 0, inCharset: 'utf8', notice: 0, needNewCode: 0, pagesize: 100, pagenum: 1}
  const CALLBACKNAME = 'jsonpCallback'
  return jsonp(URL, PARAMS, CALLBACKNAME)
}
