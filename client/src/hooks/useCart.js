import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCart, addToCart, removeFromCart, clearCart } from '../api/cart'

export const useCart = (enabled = true) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await getCart()
      return data.cart
    },
    enabled
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })
}