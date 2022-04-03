import type { IncomingMessage } from 'http'
import { getFirestore } from 'firebase-admin/firestore'
import { useQuery } from 'h3'

const db = getFirestore();

export default async (req: IncomingMessage) => {
  const { post } = useQuery(req)
  const { docs } = await db
    .collection('posts')
    .where('token', '==', post).get()
  const data = docs[0].data()

  delete data.iphash
  return data
}