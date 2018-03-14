import jsonp from '../js/jsonp'
export function getSingerList (id) {
  const URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const PARAMS = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: id,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  }
  const CALLBACKNAME = 'jsonpCallback'
  return jsonp({url: URL, params: PARAMS, callback: CALLBACKNAME})
}
