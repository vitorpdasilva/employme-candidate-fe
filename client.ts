import { authStore } from '~/stores'
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
  body?: unknown
  headers?: unknown
  signal?: AbortSignal
  next?: {
    revalidate?: number
  }
}

const controller = new AbortController()
const signal = controller.signal

// refactor this to use tanstack/react-query

const useFetchApi = (): void => {
  const tokens = authStore((state) => state.tokens)

  const fetchApi = async ({
    url,
    method = 'POST',
    mode = 'cors',
    cache = 'no-cache',
    credentials = 'same-origin',
    body,
    headers,
  }: FetchApiProps): Promise<unknown> => {
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...(tokens?.accessToken && { Authorization: `Bearer ${tokens.accessToken}` }),
      ...headers,
    }

    const requestBody: Omit<FetchApiProps, 'url'> = {
      method,
      mode,
      cache,
      credentials,
      headers: requestHeaders,
      signal,
      next: {
        revalidate: 120, // revalidate cache every 2 minutes
      },
    }

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
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
  return { fetchApi }
}
export { BASE_URL, useFetchApi }
