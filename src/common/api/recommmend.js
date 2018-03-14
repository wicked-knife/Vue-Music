import jsonp from '../js/jsonp'
export function getRecommend () {
  const URL = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const PARAMS = {g_tk: 5381, format: 'json', platform: 'h5', notice: 0, outCharset: 'utf-8'}
  const CALLBACKNAME = 'jsonpCallback'
  return jsonp({url: URL, params: PARAMS, callback: CALLBACKNAME})
}
