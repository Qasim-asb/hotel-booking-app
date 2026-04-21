import { useQuery } from '@tanstack/react-query'
import { getPostBySlug } from '../api/posts'

export const usePost = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data } = await getPostBySlug(slug)
      return data.post
    },
    enabled: !!slug
  })
}