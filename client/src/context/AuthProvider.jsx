import React, { createContext, useContext, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { checkAuth, login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/auth'
import Spinner from '../components/common/Spinner'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const { data } = await checkAuth()
      return data.user
    },
    retry: (failureCount, error) => {
      const status = error?.response?.status
      if (status === 401) return false
      return failureCount < 2
    }
  })

  const user = data || null

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth-user'] })
    }
  })

  const registerMutation = useMutation({
    mutationFn: (userData) => apiRegister(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth-user'] })
    }
  })

  const logoutMutation = useMutation({
    mutationFn: apiLogout,
    onSuccess: async () => {
      queryClient.setQueryData(['auth-user'], null)
      queryClient.clear()
    }
  })

  const value = useMemo(() => ({
    user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending
  }), [user])

  if (isLoading) return <Spinner size='lg' />

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
