import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.scss'
import { ThemeProvider } from './components/Common/theme-provider.jsx'
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { api } from './services/api/index.jsx'
import UploadContextProvider from './context/UploadContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await api.get(queryKey[0])
        return response.data
      }
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <HelmetProvider>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <UploadContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </UploadContextProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
  //</React.StrictMode>
)
