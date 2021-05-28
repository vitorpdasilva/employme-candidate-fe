import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

const BASE_URL = process.env.NODE_ENV === "production" ? "prod-url/graphql" : "http://localhost:4000/graphql";

const useClient = () => {
  const [idToken, setIdToken] = useState("");
  useEffect(() => {
    const { id_token } = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
    setIdToken(id_token);
  }, []);
  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken },
  });
}

export {
  useClient,
  BASE_URL,
}