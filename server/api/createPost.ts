import type { IncomingMessage, ServerResponse } from 'http'
import sanitizeHtml from 'sanitize-html';
import { getFirestore } from 'firebase-admin/firestore'
import { createHash } from 'crypto'
import { v4 as uuidv4 } from 'uuid';
import { useBody } from 'h3'
import { cache } from '~/server/cache'
import requestIp from 'request-ip'

const db = getFirestore();

const availableCountries = [
  {
    name: 'Ukraine',
    currencies: ['UAH']
  },
]

const checkAvailableCardNumber = async (value: string) => {
  try {
    const { country }  = await $fetch<any>(`https://lookup.binlist.net/${value.slice(0, -4)}`)

    const list = availableCountries.filter(({ name, currencies }) => {
      return name === country.name && currencies.includes(country.currency)
    })

    return list.length > 0
  } catch (_) {
    return false
  }
}

const validationCreditCard = async (value: string) => {
  if (!value) return true

  if (value.length !== 16) {
    throw new Error('cardNumberTooShort')
  }
  
  const isAvailableCardNumber = await checkAvailableCardNumber(value)

  if (!isAvailableCardNumber) {
    throw new Error('notSupportedCardNumber')
  }
}

interface ICryptoAddress {
  network: string | null
  address: string | null
}

const validationCryptoAddress = async ({ network, address }: ICryptoAddress) => {
  if (network && address) {
    return true
  } else if (!network && !address) {
    return true
  }

  if (!network) {
    throw new Error('selectNetwork')
  }

  if (!address) {
    throw new Error('insertCryptoWalletAddress')
  }

  return true
}

const checkTelegramUsername = (value: string) => {
  if (value.length < 5) return false

  const lastSymbol = value[value.length - 1];

  if (lastSymbol === '_') return false

  return /^[a-z0-9_]*$/i.test(value)
}

const validationTelegramUsername = (value: string) => {
  if (checkTelegramUsername(value)) {
    return true
  }

  throw new Error('telegramUsernameIsInvalid')
}

const genSha256 = (value: string) => {
  return createHash('sha256')
    .update(value)
    .digest('hex')
}

const checkAbilityToCreatePost = async (req: IncomingMessage) => {
  const day = 60 * 60 * 24 * 1000
  const clientIp = requestIp.getClientIp(req)
  const iphsah = genSha256(clientIp)

  const { docs } = await db
    .collection('posts')
    .where('iphash', '==', iphsah).get()
  const createdAtList = docs.filter((item) => {
    const data = item.data()
    const createdAt = new Date(data.createdAt).getTime()
    const now = new Date().getTime()
    const abilityDateFrom = createdAt + (day * 3)
    return abilityDateFrom > now
  })

  return createdAtList.length === 0
}


export default async (req: IncomingMessage, res: ServerResponse) => {
  const body = await useBody(req)
  const createdAt = new Date().toISOString()
  const hasAbilityToCreatePost = await checkAbilityToCreatePost(req)
  const clientIp = requestIp.getClientIp(req)
  const iphash = genSha256(clientIp)

  try {
    if (!hasAbilityToCreatePost) {
      throw new Error('creationLimitExceeded')
    }
  
    validationTelegramUsername(body.telegramUsername)
    await validationCreditCard(body.creditcard)
    await validationCryptoAddress(body.cryptoaddress)
  } catch ({ message }) {
    res.statusCode = 400
    return message
  }

  const story = sanitizeHtml(body.story, {
    allowedTags: ['div', 'img', 'br'],
    allowedAttributes: {'img': ['src']},
    allowedSchemes: [ 'data', 'http', 'https']
  })

  let data = {
    id: uuidv4(),
    iphash,
    title: body.title,
    story,
    telegramUsername: body.telegramUsername,
    creditcard: body.creditcard,
    cryptoaddress: body.cryptoaddress,
    createdAt,
    token: null
  }

  const token = genSha256(data.id + data.title + data.story + data.createdAt + uuidv4() + Date.now());

  data = {
    ...data,
    token,
  }

  await db.collection('posts').add(data)
  delete data.iphash
  cache.clear()
  return data
}