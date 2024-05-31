import './App.css'
import useRouteElement from './useRouteElement'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { Toaster } from 'react-hot-toast'

function App() {
  const routeElement = useRouteElement()

  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routeElement}
      <Toaster
        position='top-center'
        toastOptions={{
          className:
            'relative flex p-3 font-gray-300 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer',
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff'
          }
        }}
      />
    </div>
  )
}

export default App
