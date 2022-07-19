const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyric) {
  const lyricInfos = []
  const lyricString = lyric.split("\n")
  for (const item of lyricString) {
    //时间
    const timeResult = timeRegExp.exec(item)
    if (!timeResult) continue
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecond = timeResult[3].length === 2 ? timeResult[3] * 10 : timeResult[3] * 1
    const time = minute + second + millsecond
    //歌词
    const text = item.replace(timeResult[0], "")
    const lyricInfo = { time, text }
    lyricInfos.push(lyricInfo)
  }
  // console.log(lyricInfos);
  return lyricInfos
}