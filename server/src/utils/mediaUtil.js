import ffmpeg from 'fluent-ffmpeg'

const getVideoDuration = filePath => {
  return new Promise((resolve, reject) => {
    ffmpeg(filePath, (err, metadata) => {
      if (err) {
        reject(err)
      } else {
        const duration = metadata.format.duration
        resolve(duration)
      }
    })
  })
}

export default getVideoDuration
