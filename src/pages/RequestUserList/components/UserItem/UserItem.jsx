import useravatar from '../../../../assets/images/useravatar.jpg'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { acceptRequestToChef, rejectRequestToChef } from '../../../../apis/adminApi'
import { useState } from 'react'
import { queryClient } from '../../../../main'
import ModalRequest from '../ModalRequest'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'

export default function UserItem({ user }) {
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)

  const [openRequest, setOpenRequest] = useState(false)

  const handleOpenRequest = () => {
    setOpenRequest(true)
  }

  const handleCloseRequest = () => {
    setOpenRequest(false)
  }

  const handleOpenAccept = () => {
    setOpenAccept(true)
  }
  const handleCloseAccept = () => {
    setOpenAccept(false)
  }

  const handleOpenReject = () => {
    setOpenReject(true)
  }

  const handleCloseReject = () => {
    setOpenReject(false)
  }

  const acceptUserMutation = useMutation({
    mutationFn: (body) => acceptRequestToChef(body)
  })

  const rejectUserMutation = useMutation({
    mutationFn: (body) => rejectRequestToChef(body)
  })

  const handleAccept = () => {
    acceptUserMutation.mutate(
      { user_id: user._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['request-list']
          })
          toast.success('Đồng ý thành công')
        }
      }
    )
  }

  const handleReject = () => {
    rejectUserMutation.mutate(
      { user_id: user._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['request-list']
          })
          toast.success('Từ chối thành công')
        }
      }
    )
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
        <td className='px-6 py-4 whitespace-nowrap'>
          {user?.upgrade_request.type === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold text-red-700 dark:text-red-300  '>
              Đủ follow
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold text-gray-700 dark:text-gray-300'>
              Cần minh chứng
            </span>
          )}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {user.role === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-black'>
              Người dùng
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800 dark:text-black '>
              Đầu bếp
            </span>
          )}
        </td>
        <td className='px-6 py-4 mt-2 flex gap-2 item-center whitespace-nowrap  text-sm font-medium'>
          {user?.upgrade_request.type === 1 && (
            <div onClick={handleOpenRequest} className='text-green-500 cursor-pointer hover:text-green-800'>
              Xem
            </div>
          )}
          <div onClick={handleOpenAccept} className='text-indigo-600 cursor-pointer hover:text-indigo-900'>
            Đồng ý
          </div>
          <div onClick={handleOpenReject} className=' cursor-pointer text-red-600 hover:text-red-900'>
            Từ chối
          </div>
          <span>
            {openAccept && (
              <ConfirmBox
                closeModal={handleCloseAccept}
                handleDelete={handleAccept}
                isPending={acceptUserMutation.isPending}
                title={'Xác nhận đồng ý'}
                subtitle={'Bạn có chắc chắn muốn đồng ý yêu cầu chứ'}
                tilteButton={'Đồng ý'}
              />
            )}
            {openReject && (
              <ConfirmBox
                closeModal={handleCloseReject}
                handleDelete={handleReject}
                isPending={rejectUserMutation.isPending}
                title={'Xác nhận từ chối'}
                subtitle={'Bạn có chắc chắn muốn từ chối yêu cầu chứ'}
                tilteButton={'Từ chối'}
              />
            )}
            {openRequest && <ModalRequest request={user.upgrade_request} handleCloseModal={handleCloseRequest} />}
          </span>
        </td>
      </tr>
    </>
  )
}
