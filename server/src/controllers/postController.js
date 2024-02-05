import Post from '../models/post.model.js'
import generateFileName from '../utils/generate-filename.js'
import { uploadFile } from '../helpers/s3.js'
import sharp from 'sharp'

//TODO: MULTIPLE POSTS
//s3 test
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body
    const file = req.file
    const postName = generateFileName()

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer()

    // Загружаем изображение на сервер
    await uploadFile(fileBuffer, postName, file.mimetype)

    // Создаем объект Post с данными о загруженном изображении
    const post = new Post({
      title: title,
      content: postName
    })

    // Сохраняем объект Post в базе данных
    await post.save()

    // Отправляем успешный ответ с данными о созданном посте
    res.status(201).send(post)
  } catch (error) {
    // Обрабатываем ошибку и отправляем соответствующий статус ответа
    res.status(500).json({ error: error.message })
  }
}
