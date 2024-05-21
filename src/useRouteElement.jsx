/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'

const Home = lazy(() => import('./pages/Home'))
const UserList = lazy(() => import('./pages/UserList'))

const LoginAdmin = lazy(() => import('./pages/LoginAdmin'))

export default function useRouteElement() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <AuthLayout>
              <Suspense>
                <LoginAdmin />
              </Suspense>
            </AuthLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          index: true,
          element: (
            <MainLayout>
              <Suspense>
                <Home />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/user',
          index: true,
          element: (
            <MainLayout>
              <Suspense>
                <UserList />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },

    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routeElement
}
