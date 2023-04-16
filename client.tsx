const BASE_URL =
  process.env.NODE_ENV === "production" ? "prod-url/graphql" : "http://localhost:3001/api"

type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors"
type RequestCache =
  | "default"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache"
  | "only-if-cached"
type RequestCredentials = "omit" | "same-origin" | "include"
export type ErrorResponse = {
  message: string
  statusCode: number
}

type FetchApiProps = {
  url: string
  method?: "POST" | "GET" | "DELETE" | "PUT" | "PATCH"
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  body?: any
  headers?: any
  signal?: AbortSignal
}

const controller = new AbortController()
const signal = controller.signal

const fetchApi = async ({
  url,
  method = "POST",
  mode = "cors",
  cache = "no-cache",
  credentials = "same-origin",
  body,
  headers = {
    "Content-Type": "application/json",
  },
}: FetchApiProps) => {
  const token = window.localStorage.getItem("token")
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const requestBody: Omit<FetchApiProps, "url"> = {
    method,
    mode,
    cache,
    credentials,
    headers,
    signal,
  }

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    if (body instanceof FormData) {
      requestBody.body = body
      delete requestBody.headers["Content-Type"]
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
  throw new Error(errorResponseData.message || "Something went wrong.")
}

export { fetchApi, BASE_URL }
