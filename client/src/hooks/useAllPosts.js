import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../api/posts'

export const useAllPosts = () => {
  return useQuery({
    queryKey: ['all-posts'],
    queryFn: async () => {
      const { data } = await getAllPosts()
      return data.posts
    }
  })
}