import type { IncomingMessage } from 'http'
import { getFirestore } from 'firebase-admin/firestore'
import { useBody } from 'h3'
import { cache } from '~/server/cache';

const db = getFirestore();

export default async (req: IncomingMessage) => {
  const { token } = await useBody(req)
  const res = await db.collection('posts').where('token', '==', token).get()


  const deleted = await res.docs[0].ref.delete()
  cache.clear()
  return !!deleted
}
