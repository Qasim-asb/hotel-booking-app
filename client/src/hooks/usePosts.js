import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts'

export const usePosts = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: async () => {
      const { data } = await getPosts({ page, limit })
      return data
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData
  })
}