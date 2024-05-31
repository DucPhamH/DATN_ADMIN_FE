import useravatar from '../../../../assets/images/useravatar.jpg'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { banUserAdmin, deleteUserAdmin, unbanUserAdmin } from '../../../../apis/adminApi'
import { useState } from 'react'
import { queryClient } from '../../../../main'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'

export default function UserItem({ user }) {
  const [openDelete, setOpenDelete] = useState(false)
  const [openBan, setOpenBan] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleOpenBan = () => {
    setOpenBan(true)
  }

  const handleCloseBan = () => {
    setOpenBan(false)
  }

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUserAdmin(user._id),
    onSuccess: () => {
      toast.success('Xóa người dùng thành công')
      queryClient.invalidateQueries({
        queryKey: ['inspector-list']
      })
      handleCloseDelete()
    }
  })
  const handleDelete = () => {
    deleteUserMutation.mutate()
  }

  const banMutation = useMutation({
    mutationFn: (body) => banUserAdmin(body)
  })

  const unbanMutation = useMutation({
    mutationFn: (body) => unbanUserAdmin(body)
  })

  const handleBan = () => {
    if (user?.status === 0) {
      unbanMutation.mutate(
        { user_id: user._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['inspector-list']
            })
            toast.success('Mở khóa thành công')
          }
        }
      )
    } else {
      banMutation.mutate(
        { user_id: user._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['inspector-list']
            })
            toast.success('Khóa thành công')
          }
        }
      )
    }
  }

  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex gap-2 items-center'>
            <div className='inline-block'>
              <img
                className='rounded-full object-cover max-w-none w-8 h-8'
                src={user.avatar === '' ? useravatar : user.avatar}
              />
            </div>
            <div>
              <div className='text-sm text-gray-700 dark:text-gray-300'>{user.name}</div>
              <div className='text-xs text-gray-500'>@{user.user_name}</div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          {user.status === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-black dark:bg-pink-200'>
              Bị khóa
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
              Đang hoạt động
            </span>
          )}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800 dark:text-black '>
            Người kiểm duyệt
          </span>
        </td>
        <td className='px-6 py-4 mt-2 flex item-center whitespace-nowrap  text-sm font-medium'>
          {user.status === 1 ? (
            <div onClick={handleOpenBan} className='text-indigo-600 cursor-pointer hover:text-indigo-900'>
              Khóa
            </div>
          ) : (
            <div onClick={handleOpenBan} className='text-gray-500 cursor-pointer'>
              Mở khóa
            </div>
          )}

          <div onClick={handleOpenDelete} className='ml-2 cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>
          <span>
            {openDelete && (
              <ConfirmBox
                closeModal={handleCloseDelete}
                handleDelete={handleDelete}
                isPending={deleteUserMutation.isPending}
                title={'Xác nhận xóa'}
                subtitle={'Bạn có chắc chắn muốn xóa người dùng chứ'}
              />
            )}
            {openBan && (
              <ConfirmBox
                closeModal={handleCloseBan}
                handleDelete={handleBan}
                isPending={user.status === 1 ? banMutation.isPending : unbanMutation.isPending}
                title={user.status === 1 ? 'Xác nhận khóa' : 'Xác nhận mở khóa'}
                subtitle={
                  user.status === 1
                    ? 'Bạn có chắc chắn muốn khóa người dùng chứ'
                    : 'Bạn có chắc chắn muốn mở khóa người dùng chứ'
                }
                tilteButton={user.status === 1 ? 'Khóa' : 'Mở khóa'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
