import moment from 'moment'
import { Link } from 'react-router-dom'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { cutString } from '../../../../utils/helper'
import { queryClient } from '../../../../main'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { acceptReportPost, rejectReportPost } from '../../../../apis/inspectorApi'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'
export default function PostItem({ post }) {
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)

  console.log(post)

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

  const acceptPostsMutation = useMutation({
    mutationFn: () => acceptReportPost(post._id)
  })

  const rejectPostsMutation = useMutation({
    mutationFn: (body) => rejectReportPost(post._id, body)
  })

  const handleAccept = () => {
    acceptPostsMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['report-list']
        })
        toast.success('Giữ bài viết thành công')
      }
    })
  }

  console.log(post?.user._id)

  const handleReject = () => {
    const user_id = post?.user._id
    console.log(user_id)
    rejectPostsMutation.mutate(
      { user_id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['report-list']
          })
          toast.success('Xóa bài viết thành công')
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
                src={post.user.avatar === '' ? useravatar : post.user.avatar}
              />
            </div>
            <div>
              <div className='text-sm text-gray-700 dark:text-gray-300'>{post.user.name}</div>
              <div className='text-xs text-gray-500'>@{post.user.user_name}</div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>
            {post.content === '' ? 'Bài viết không có nội dung' : cutString(post.content, 20)}
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{post.report_count} lần bị báo cáo</div>
        </td>

        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(post.createdAt).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 flex gap-2 mt-2 item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/reports/${post._id}`} className='text-green-500 cursor-pointer hover:text-green-800'>
            Xem
          </Link>
          <div onClick={handleOpenAccept} className='text-indigo-600 cursor-pointer hover:text-indigo-900'>
            Giữ
          </div>
          <div onClick={handleOpenReject} className=' cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>
          <span>
            {openAccept && (
              <ConfirmBox
                closeModal={handleCloseAccept}
                handleDelete={handleAccept}
                isPending={acceptPostsMutation.isPending}
                title={'Xác nhận duyệt'}
                subtitle={'Bạn có chắc chắn muốn giữ bài viết chứ'}
                tilteButton={'Giữ bài viết'}
              />
            )}
            {openReject && (
              <ConfirmBox
                closeModal={handleCloseReject}
                handleDelete={handleReject}
                isPending={rejectPostsMutation.isPending}
                title={'Xác nhận từ chối'}
                subtitle={'Bạn có chắc chắn muốn xóa bài viết chứ'}
                tilteButton={'Xóa bài viết'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
