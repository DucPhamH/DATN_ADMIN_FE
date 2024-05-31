import moment from 'moment'
import { Link } from 'react-router-dom'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { cutString } from '../../../../utils/helper'
import { queryClient } from '../../../../main'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { acceptAlbum, rejectAlbum } from '../../../../apis/inspectorApi'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'
export default function AlbumItem({ album }) {
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)

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

  const acceptAlbumsMutation = useMutation({
    mutationFn: () => acceptAlbum(album._id)
  })

  const rejectAlbumsMutation = useMutation({
    mutationFn: () => rejectAlbum(album._id)
  })

  const handleAccept = () => {
    acceptAlbumsMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['albums-list']
        })
        toast.success('Duyệt thành công')
      }
    })
  }

  const handleReject = () => {
    rejectAlbumsMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['albums-list']
        })
        toast.success('Từ chối thành công')
      }
    })
  }
  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex gap-2 items-center'>
            <div className='inline-block'>
              <img
                className='rounded-full object-cover max-w-none w-8 h-8'
                src={album.user.avatar === '' ? useravatar : album.user.avatar}
              />
            </div>
            <div>
              <div className='text-sm text-gray-700 dark:text-gray-300'>{album.user.name}</div>
              <div className='text-xs text-gray-500'>@{album.user.user_name}</div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{cutString(album.title, 20)}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          {album.status === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-black dark:bg-pink-200'>
              Chưa duyệt
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
              Đã duyệt
            </span>
          )}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{album.category_album}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(album.createdAt).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 mt-2 gap-2 flex item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/albums/${album._id}`} className='text-green-500 cursor-pointer hover:text-green-800'>
            Xem
          </Link>
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
                isPending={acceptAlbumsMutation.isPending}
                title={'Xác nhận duyệt'}
                subtitle={'Bạn có chắc chắn muốn duyệt album chứ'}
                tilteButton={'Duyệt'}
              />
            )}
            {openReject && (
              <ConfirmBox
                closeModal={handleCloseReject}
                handleDelete={handleReject}
                isPending={rejectAlbumsMutation.isPending}
                title={'Xác nhận từ chối'}
                subtitle={'Bạn có chắc chắn muốn từ chối album chứ'}
                tilteButton={'Từ chối'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
