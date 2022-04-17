import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { getFirestore } from 'firebase-admin/firestore'
import innertext from 'innertext'

const db = getFirestore();

export default async (req: IncomingMessage) => {
  const params = useQuery(req)
  const page = Number(params.page) - 1
  const perPage = Number(params.perPage)

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

  return postList
}