import { initializeApp, cert } from 'firebase-admin/app'
import serviceAccount from '~/cert/firebaseServiceAccount'

initializeApp({
  credential: cert(serviceAccount as any),
  databaseURL: process.env.DATABASE_URL
})


export default async () => {}