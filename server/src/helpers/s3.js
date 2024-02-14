import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3'

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv'
import { getVideoDurationInSeconds } from 'get-video-duration'
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.AWS_BUKCET_SECRET_KEY
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadOptions = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }
  return s3Client.send(new PutObjectCommand(uploadOptions))
}

export function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams))
}

export async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  const command = new GetObjectCommand(params)
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds })
  return url
}

export const getVideoDurationFromS3 = async key => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key
    }
    const command = new GetObjectCommand(params)
    const s3Object = await s3Client.send(command)
    const duration = await getVideoDurationInSeconds(s3Object.Body)
    return duration
  } catch (error) {
    throw error
  }
}
