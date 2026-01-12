import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import router from './routes'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        components: "buttons",
        "enable-funding": "card,venmo",
        "data-sdk-integration-source": "developer-studio",
      }}
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </PayPalScriptProvider>
  </StrictMode >,
)
