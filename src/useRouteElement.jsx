/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'
import CreateRecipe from './pages/CreateRecipe'
import CreateLayout from './layouts/CreateLayout'

const Home = lazy(() => import('./pages/Home'))
const UserList = lazy(() => import('./pages/UserList'))
const InspectorList = lazy(() => import('./pages/InspectorList'))
const WritterList = lazy(() => import('./pages/WritterList'))
const LoginAdmin = lazy(() => import('./pages/LoginAdmin'))
const RequestUserList = lazy(() => import('./pages/RequestUserList'))
const RecipesList = lazy(() => import('./pages/RecipesList'))
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'))
const BlogList = lazy(() => import('./pages/BlogList'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const AlbumList = lazy(() => import('./pages/AlbumList'))
const AlbumDetail = lazy(() => import('./pages/AlbumDetail'))
const ReportList = lazy(() => import('./pages/ReportList'))
const ReportDetail = lazy(() => import('./pages/ReportDetail'))
const IngredientList = lazy(() => import('./pages/IngredientList'))
const RecipeWritterList = lazy(() => import('./pages/RecipeWritterList'))
const EditRecipe = lazy(() => import('./pages/EditRecipe'))

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
        },
        {
          path: '/recipes',
          element: (
            <MainLayout>
              <Suspense>
                <RecipesList />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/recipes/:id',
          element: (
            <MainLayout>
              <Suspense>
                <RecipeDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/blogs',
          element: (
            <MainLayout>
              <Suspense>
                <BlogList />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/blogs/:id',
          element: (
            <MainLayout>
              <Suspense>
                <BlogDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/albums',
          element: (
            <MainLayout>
              <Suspense>
                <AlbumList />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/albums/:id',
          element: (
            <MainLayout>
              <Suspense>
                <AlbumDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/albums/recipes/:id',
          element: (
            <MainLayout>
              <Suspense>
                <RecipeDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/reports',
          element: (
            <MainLayout>
              <Suspense>
                <ReportList />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/reports/:id',
          element: (
            <MainLayout>
              <Suspense>
                <ReportDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/ingredients',
          element: (
            <MainLayout>
              <Suspense>
                <IngredientList />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/recipes-writter',
          element: (
            <MainLayout>
              <Suspense>
                <RecipeWritterList />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/recipes-writter/create',
          element: (
            <CreateLayout>
              <Suspense>
                <CreateRecipe />
              </Suspense>
            </CreateLayout>
          )
        },
        {
          path: '/recipes-writter/edit/:id',
          element: (
            <CreateLayout>
              <Suspense>
                <EditRecipe />
              </Suspense>
            </CreateLayout>
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
