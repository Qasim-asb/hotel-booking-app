import { useQuery } from '@tanstack/react-query'
import { getPostReviews } from '../api/reviews'

export const usePostReviews = (postId) => {
  return useQuery({
    queryKey: ['reviews', postId],
    queryFn: async () => {
      const { data } = await getPostReviews(postId)
      return data.reviews
    },
    enabled: !!postId,
  })
}