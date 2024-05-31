import moment from 'moment'
import { Link } from 'react-router-dom'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { cutString } from '../../../../utils/helper'
import { queryClient } from '../../../../main'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { acceptBlog, rejectBlog } from '../../../../apis/inspectorApi'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'
export default function BlogItem({ blog }) {
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

  const acceptBlogsMutation = useMutation({
    mutationFn: () => acceptBlog(blog._id)
  })

  const rejectBlogsMutation = useMutation({
    mutationFn: () => rejectBlog(blog._id)
  })

  const handleAccept = () => {
    acceptBlogsMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['blogs-list']
        })
        toast.success('Duyệt thành công')
      }
    })
  }

  const handleReject = () => {
    rejectBlogsMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['blogs-list']
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
                src={blog.user.avatar === '' ? useravatar : blog.user.avatar}
              />
            </div>
            <div>
              <div className='text-sm text-gray-700 dark:text-gray-300'>{blog.user.name}</div>
              <div className='text-xs text-gray-500'>@{blog.user.user_name}</div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{cutString(blog.title, 20)}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          {blog.status === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-black dark:bg-pink-200'>
              Chưa duyệt
            </span>
          ) : blog.status === 1 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
              Đã duyệt
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-black'>
              Bị từ chối
            </span>
          )}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{blog.category_blog.name}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(blog.createdAt).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 flex gap-2 mt-2 item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/blogs/${blog._id}`} className='text-green-500 cursor-pointer hover:text-green-800'>
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
                isPending={acceptBlogsMutation.isPending}
                title={'Xác nhận duyệt'}
                subtitle={'Bạn có chắc chắn muốn duyệt bài viết chứ'}
                tilteButton={'Duyệt'}
              />
            )}
            {openReject && (
              <ConfirmBox
                closeModal={handleCloseReject}
                handleDelete={handleReject}
                isPending={rejectBlogsMutation.isPending}
                title={'Xác nhận từ chối'}
                subtitle={'Bạn có chắc chắn muốn từ chối bài viết chứ'}
                tilteButton={'Từ chối'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
