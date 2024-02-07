import { api } from '@/services/api'
import { create } from 'zustand'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { authStatus } from '@/services/auth-service'

// const useAuth = create(set => ({
//   isAuthenticated: false,
//   accessToken: null,
//   loading: true,
//   error: null,
//   checkAuthentication: async () => {
//     try {
//       set({ loading: true })
//       const res = await api.get('/auth/status')
//       const data = await res.data
//       console.log('====================================')
//       console.log(data)
//       console.log('====================================')
//       if (data.isAuthenticated === true) {
//         set({ isAuthenticated: true, error: null })
//       } else {
//         throw new Error('User is not authenticated.')
//       }
//     } catch (error) {
//       if (error.message === 'User is not authenticated.') {
//         if (!publicOnly) {
//           toast.error('User NOT authenticated')
//         }
//       }
//       set({ error: error.message, isAuthenticated: false })
//     } finally {
//       set({ loading: false })
//     }
//   }
// }))

// export default useAuth
