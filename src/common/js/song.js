
class Song {
  constructor (obj) {
    this.album = obj.albumname
    this.duration = obj.interval
    this.id = obj.songid
    this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj.albummid}.jpg?max_age=2592000`
    this.mid = obj.songmid
    this.name = obj.songname
    this.singer = obj.singer[0].name
    this.url = `http://ws.stream.qqmusic.qq.com/C100${obj.songmid}.m4a?fromtag=46`
  }
}
export function createSingerSong (songList) {
  return fixSingerSong(songList)
}

export function createSearchSong (songlist) {
  let arr = []
  songlist.forEach((song) => {
    arr.push(new Song(song))
  })
  return arr
}

export function createRankSong (songlist) {
  let arr = []
  songlist.forEach((song) => {
    arr.push(new Song(song))
  })
  return arr
}

function fixSingerSong (songList) {
  let arr = []
  songList.forEach(song => {
    let obj = {}
    obj = song.musicData
    arr.push(obj)
  })
  let list = []
  arr.forEach(async song => {
    let obj = new Song(song)
    list.push(obj)
  })
  return list
}
