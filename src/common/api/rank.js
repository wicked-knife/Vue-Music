import jsonp from '../js/jsonp'
export function getRank () {
  const URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const PARAMS = {
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1518333056826
  }
  const CALLBACKNAME = 'jsonpCallback'
  return jsonp({url: URL, params: PARAMS, callback: CALLBACKNAME})
}
