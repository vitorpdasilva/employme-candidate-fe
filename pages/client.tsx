const BASE_URL = process.env.NODE_ENV === "production" ? "prod-url/graphql" : "http://localhost:3001/api";

type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors"
type RequestCache = "default"|  "no-store"|  "reload"|  "no-cache"|  "force-cache"|  "only-if-cached"
type RequestCredentials = "omit" | "same-origin" | "include"
export type ErrorResponse = {
  message: string
  statusCode: number
}

type FetchApiProps = {
  url: string
  method?: "POST" | "GET" | "DELETE" | "PUT"
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  body?: any
  headers?: {
    [key: string]: string
  }
}

const fetchApi = async({ url, method = "POST", mode = "cors", cache = "no-cache", credentials = "same-origin", body = {} }: FetchApiProps) => {
  
  const requestBody: Omit<FetchApiProps, "url"> = {
    method,
    mode,
    cache,
    credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }

  if (method === 'GET') {
    delete requestBody.body
  }
  
  
    const data = await fetch(`${BASE_URL}${url}`, requestBody);
    if (!data.ok) {
      const res: ErrorResponse = await data.clone().json()
      throw new Error(res.message || 'Something went wrong')
    }
    return data.json()
  
};

export {
  fetchApi,
  BASE_URL,
};