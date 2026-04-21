import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllTrips, createTrip, updateTrip, deleteTrip } from '../api/trips'

export const useTrips = () => {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await getAllTrips()
      return data.trips
    }
  })
}

export const useCreateTrip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] })
  })
}

export const useUpdateTrip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }) => updateTrip(id, formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] })
  })
}

export const useDeleteTrip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] })
  })
}