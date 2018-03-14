import jsonp from '../js/jsonp'
export function search (query, page, zhida) {
  const URL = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const PARAMS = {
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: 1518421037814
  }
  const CALLBACKNAME = 'jsonpCallback'
  return jsonp({url: URL, params: PARAMS, callback: CALLBACKNAME})
}
