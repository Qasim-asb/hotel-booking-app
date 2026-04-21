import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost, updatePost } from '../api/posts'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ slug, formData }) => updatePost(slug, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}