import type { IncomingMessage } from 'http'
import { getFirestore } from 'firebase-admin/firestore'
import { useQuery } from 'h3'
import { cache } from '~/server/cache'

const db = getFirestore();

export default async (req: IncomingMessage) => {
  const { id } = useQuery(req)

  const cacheKey = 'post-' + id
  const cachePostData = JSON.parse(cache.get(cacheKey) || null)

  if (cachePostData) {
    return cachePostData
  }

  const { docs } = await db
    .collection('posts')
    .where('id', '==', id).get()
  const data = docs[0].data()
  delete data.token


  cache.set(cacheKey, JSON.stringify(data))

  return data
}