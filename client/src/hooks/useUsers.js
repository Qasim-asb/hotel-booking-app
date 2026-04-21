import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllUsers, updateUserRole } from '../api/users'

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await getAllUsers()
      return data.users
    }
  })
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })
}