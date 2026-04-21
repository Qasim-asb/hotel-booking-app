import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/categories'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await getCategories()
      return data.categories
    },
    staleTime: 1000 * 60 * 5
  })
}