import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { getFirestore } from 'firebase-admin/firestore'
import innertext from 'innertext'
import { cache } from '~/server/cache'

const db = getFirestore();

export default async (req: IncomingMessage) => {
  const params = useQuery(req)
  const page = Number(params.page) - 1
  const perPage = Number(params.perPage)

  let cachePostList = JSON.parse(cache.get('postList-' + page) || '[]')

  if (cachePostList.length > 0) {
    return cachePostList
  }

  const { docs } = await db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(perPage)
    .offset(page * perPage)
    .get()

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

  
  cache.set('postList-' + page, JSON.stringify(postList))
  return postList
}