import jsonp from '../js/jsonp'
export function getRankList (id) {
  const URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const PARAMS = {
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: id,
    _: 1518349779807
  }
  const CALLBACKNAME = 'jsonpCallback'
  return jsonp(URL, PARAMS, CALLBACKNAME)
}
