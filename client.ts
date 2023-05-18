import { authStore } from '@/stores'
const BASE_URL = process.env.NODE_ENV === 'production' ? 'prod-url/graphql' : 'http://localhost:3500/api'

type RequestMode = 'navigate' | 'same-origin' | 'no-cors' | 'cors'
type RequestCache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
type RequestCredentials = 'omit' | 'same-origin' | 'include'
export type ErrorResponse = {
  message: string
  statusCode: number
}

type FetchApiProps = {
  url: string
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  body?: any
  headers?: any
  signal?: AbortSignal
  next?: {
    revalidate?: number
  }
}

const controller = new AbortController()
const signal = controller.signal

const useFetchApi = async ({
  url,
  method = 'POST',
  mode = 'cors',
  cache = 'no-cache',
  credentials = 'same-origin',
  body,
  headers = {
    'Content-Type': 'application/json',
  },
}: FetchApiProps) => {
  // get rid of localstore to deal with ssr
  // ideally we gonna refactor this function into a hook
  const { accessToken } = authStore((state: any) => state.tokens)
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const requestBody: Omit<FetchApiProps, 'url'> = {
    method,
    mode,
    cache,
    credentials,
    headers,
    signal,
    next: {
      revalidate: 120, // revalidate cache every 2 minutes
    },
  }
  console.log({ body })
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (body instanceof FormData) {
      requestBody.body = body
      delete requestBody.headers['Content-Type']
    } else {
      requestBody.body = JSON.stringify(body)
    }
  }

  const response = await fetch(`${BASE_URL}${url}`, requestBody)

  if (response.ok) {
    const responseData = await response.json()
    return responseData
  }

  const errorResponseData = await response.json()
  throw new Error(errorResponseData.message || 'Something went wrong.')
}

export { useFetchApi, BASE_URL }
