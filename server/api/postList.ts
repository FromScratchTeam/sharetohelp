import { getFirestore } from 'firebase-admin/firestore'
import innertext from 'innertext'
import { cache } from '~/server/cache'

const db = getFirestore();

export default async () => {
  let cachePostList = JSON.parse(cache.get('postList') || '[]')

  if (cachePostList.length > 0) {
    return cachePostList
  }

  const { docs } = await db
    .collection('posts').orderBy('createdAt', 'desc').get()

  const postList = docs.map((item) => {
    const data = item.data()
    const imagePattern = /<img[^>]*>/g

    const [firstImage] = data.story.match(imagePattern) || []
    delete data.token
    delete data.iphash

    const [, imgSrc] = (firstImage || '').match(/src\=\"(.+)\"/) || []

    const response: any = {
      ...data,
      image: imgSrc,
      description: innertext(data.story)
    }

    delete response.story

    return response
  })

  
  cache.set('postList', JSON.stringify(postList))
  return postList
}