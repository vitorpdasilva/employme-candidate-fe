module.exports = {
  client: {
    input: 'http://localhost:3500/swagger-json',
    output: {
      target: './src/types/generated.ts',
      mode: 'split',
      client: 'react-query',
      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'nextId',
          options: {
            staleTime: 10000,
          },
        },
      },
    },
  },
}
