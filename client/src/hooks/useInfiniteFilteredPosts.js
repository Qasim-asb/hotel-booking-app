import { useInfiniteQuery } from '@tanstack/react-query'
import { filterPosts } from '../api/posts'

export const useInfiniteFilteredPosts = (filters) => {
  return useInfiniteQuery({
    queryKey: ['filtered-posts', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await filterPosts({
        ...filters,
        page: pageParam,
        limit: 6
      })
      return data
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1
      }
      return undefined
    }
  })
}