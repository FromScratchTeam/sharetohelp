import type { IncomingMessage, ServerResponse } from 'http'

export default async (_: IncomingMessage, res: ServerResponse) => {
  res.setHeader('X-Frame-Options', 'DENY')
}