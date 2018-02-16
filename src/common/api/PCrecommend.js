
import axios from 'axios'
export function getPCrecommend () {
  const URL = '/api/PCrecommend'
  const PARAMS = {
    picmid: 1,
    rnd: 0.8220681719961955,
    g_tk: 267005928,
    jsonpCallback: 'getPlaylist',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  }
  return axios.get(URL, {
    params: PARAMS
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
