import { useQuery } from '@tanstack/react-query'
import { getRelatedPosts } from '../api/posts'

export const useRelatedPosts = (postId, categoryId) => {
  return useQuery({
    queryKey: ['related-posts', postId, categoryId],
    queryFn: async () => {
      const { data } = await getRelatedPosts(postId, categoryId)
      return data.posts
    },
    enabled: !!postId && !!categoryId
  })
}