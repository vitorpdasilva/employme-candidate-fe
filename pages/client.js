const BASE_URL = process.env.NODE_ENV === "production" ? "prod-url/graphql" : "http://localhost:3001/api";

const fetchApi = async({ url, method = "POST", mode = "cors", cache = "no-cache", credentials = "same-origin", body = {} }) => {
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