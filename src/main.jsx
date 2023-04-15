import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Land from '@pages/Land'
import Game from '@pages/Game'
import { AppProvider } from '@context/AppContext'

import ErrorPage from '@/error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Land />,
    errorElement: <ErrorPage />,
  },
  { path: '/play', element: <Game />, errorElement: <ErrorPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
)
