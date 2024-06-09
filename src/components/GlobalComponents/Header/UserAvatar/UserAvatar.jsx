import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from '../../../../apis/authApi'

import { AppContext } from '../../../../contexts/app.context'
import { toast } from 'react-hot-toast'
export default function UserAvatar() {
  const [isMenu, setIsMenu] = useState(false)
  const ref = useRef()
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenu(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutAccountMutation = useMutation({
    mutationFn: () => logoutAccount()
  })

  const onLogout = () => {
    logoutAccountMutation.mutate(null, {
      onSuccess: (data) => {
        setIsAuthenticated(false)
        setProfile(null)
        console.log(data.data.message)
        toast.success(data.data.message)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div ref={ref}>
      <button
        className='flex gap-2 relative items-center transition-all duration-700 text-lg py-1 px-1 font-medium text-gray-900 rounded-full
         hover:text-red-600 dark:hover:text-red-600 dark:text-white'
        type='button'
        onClick={() => setIsMenu(!isMenu)}
      >
        <div className='w-8  h-8 md:w-10 object-cover md:h-10 rounded-full'>
          <img
            className='w-8 h-8 md:w-10 object-cover md:h-10 rounded-full'
            src={profile.avatar === '' ? useravatar : profile.avatar}
            alt='user photo'
          />
        </div>
        <div className=' flex flex-col justify-start text-sm'>
          <div className='capitalize flex flex-col justify-start text-gray-600 dark:text-gray-300 text-sm hover:underline'>
            {profile.name}
          </div>
          <p className='text-xs flex text-gray-500 dark:text-gray-400 justify-start'>@{profile.user_name}</p>
        </div>
      </button>
      <AnimatePresence>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-10%', transition: { duration: '0.1' } }}
            transition={{ type: 'spring', stiffness: '200', duration: '0.1' }}
            className='z-50 absolute top-[4rem] right-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-color-primary dark:divide-gray-600'
          >
            <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-color-primary dark:divide-gray-600'>
              {profile.role === 2 && (
                <div className='py-2 text-gray-700 dark:text-gray-200'>
                  <div>
                    <Link
                      to='/'
                      onClick={() => setIsMenu(false)}
                      className='block px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              )}
              <div className='py-2 '>
                <div
                  onClick={onLogout}
                  className='flex cursor-pointer justify-between items-center px-4 py-2 text-sm transition-all duration-400 text-gray-700 dark:hover:text-white hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                >
                  Đăng xuất
                  <div className='text-base'>
                    <HiOutlineLogout />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
