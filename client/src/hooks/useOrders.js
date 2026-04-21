import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder, getUserOrders } from '../api/orders'

export const useOrders = (enabled = true) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await getUserOrders()
      return data.orders
    },
    enabled
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })
}