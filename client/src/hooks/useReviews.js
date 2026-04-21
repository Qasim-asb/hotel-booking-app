import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { approveReview, createReview, deleteReview, getPendingReviews } from '../api/reviews'

export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview
  })
}

export const usePendingReviews = () => {
  return useQuery({
    queryKey: ['pending-reviews'],
    queryFn: async () => {
      const { data } = await getPendingReviews()
      return data.reviews
    }
  })
}

export const useApproveReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: approveReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-reviews'] })
    }
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-reviews'] })
    }
  })
}