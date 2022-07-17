const BASE_URL = process.env.NODE_ENV === "production" ? "prod-url/graphql" : "http://localhost:3001/api";

type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors"
type RequestCache = "default"|  "no-store"|  "reload"|  "no-cache"|  "force-cache"|  "only-if-cached"
type RequestCredentials = "omit" | "same-origin" | "include"

type FetchApiProps = {
  url: string
  method: string
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  body: any
}
const fetchApi = async({ url, method = "POST", mode = "cors", cache = "no-cache", credentials = "same-origin", body = {} }: FetchApiProps) => {
  const data = await fetch(`${BASE_URL}${url}`, {
    method,
    mode,
    cache,
    credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return data.json();
};

export {
  fetchApi,
  BASE_URL,
};