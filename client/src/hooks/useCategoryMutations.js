import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory, deleteCategory, updateCategory } from '../api/categories'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ slug, category }) => updateCategory(slug, category),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  })
}