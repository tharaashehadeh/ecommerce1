import React from 'react'
import ReactDOM from 'react-dom/client'
import'../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ToastContainer} from 'react-toastify';
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import UserContextProvider from './components/web/context/User.jsx'
import { CartContexrProvider } from './components/web/context/Cart.jsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <UserContextProvider>
      <CartContexrProvider>
     <QueryClientProvider client={queryClient}>
    <ToastContainer/>
    <App />
    </QueryClientProvider>
    </CartContexrProvider>
    </UserContextProvider>
    </>
    
)
