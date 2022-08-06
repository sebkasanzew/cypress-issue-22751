// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import { getToken } from 'next-auth/jwt'

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

type Data = Record<string, number>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookies = req.headers.cookie?.split('; ') || []
  const cookiesMap = cookies.reduce((acc, cookie, index) => {
    const [key, value] = cookie.split('=')
    return { ...acc, [`${index + 1}: ${key}`]: value }
  }, {} as Record<string, string>)

  const cookieLengths = Object.keys(cookiesMap).reduce((acc, current) => ({
    ...acc,
    [current]: cookiesMap?.[current]?.length || 0,
  }), {} as Record<string, number>)

  cookieLengths.all = req.headers.cookie?.length || 0

  res.status(200).json(cookieLengths)
}
