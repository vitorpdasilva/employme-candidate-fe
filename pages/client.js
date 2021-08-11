const BASE_URL = process.env.NODE_ENV === "production" ? "prod-url/graphql" : "http://localhost:3001/api";

const fetchApi = async({ url }) => {
  const data = await fetch(`${BASE_URL}/${url}`).then(data => data.json());
  return data;
}

export {
  fetchApi,
  BASE_URL,
}