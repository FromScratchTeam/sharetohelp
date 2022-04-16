import LRU from 'lru-cache'

const oneYear = 60 * 60 * 24 * 30 * 12 * 1000

export const cache = new LRU({
  max: 5000000,
  ttl: oneYear
})
