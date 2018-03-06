import axios from 'axios'
export function getLyric (name) {
  var id = ''
  return axios({
    url: 'https://api.imjad.cn/cloudmusic',
    method: 'get',
    params: {
      type: 'search',
      s: name,
      search_type: 1
    }
  }).then((res) => {
    id = res.data.result.songs[0].id
    return axios({
      url: 'https://api.imjad.cn/cloudmusic',
      method: 'get',
      params: {
        type: 'lyric',
        id
      }
    })
  })
}
