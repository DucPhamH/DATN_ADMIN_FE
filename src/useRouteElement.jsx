/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'

const Home = lazy(() => import('./pages/Home'))
const UserList = lazy(() => import('./pages/UserList'))
const InspectorList = lazy(() => import('./pages/InspectorList'))
const WritterList = lazy(() => import('./pages/WritterList'))
const LoginAdmin = lazy(() => import('./pages/LoginAdmin'))
const RequestUserList = lazy(() => import('./pages/RequestUserList'))

export default function useRouteElement() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }

  function RoleProtectedRouterAdmin() {
    const { profile } = useContext(AppContext)
    const check = Boolean(profile.role === 2)
    //  console.log(check)
    return check ? <Outlet /> : <Navigate to='/' />
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
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <RoleProtectedRouterAdmin />,
          children: [
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
            },
            {
              path: '/inspector',
              index: true,
              element: (
                <MainLayout>
                  <Suspense>
                    <InspectorList />
                  </Suspense>
                </MainLayout>
              )
            },
            {
              path: '/writter',
              index: true,
              element: (
                <MainLayout>
                  <Suspense>
                    <WritterList />
                  </Suspense>
                </MainLayout>
              )
            },
            {
              path: '/request-list',
              index: true,
              element: (
                <MainLayout>
                  <Suspense>
                    <RequestUserList />
                  </Suspense>
                </MainLayout>
              )
            }
          ]
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
