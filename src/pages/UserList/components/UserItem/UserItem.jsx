import moment from 'moment'

export default function UserItem({ user }) {
  // const [openDelete, setOpenDelete] = useState(false)

  // const handleOpenDelete = () => {
  //   setOpenDelete(true)
  // }
  // const handleCloseDelete = () => {
  //   setOpenDelete(false)
  // }
  // const deleteBlogMutation = useMutation({
  //   mutationFn: () => deleteBlogForChef(blog._id),
  //   onSuccess: () => {
  //     toast.success('Xóa bài viết thành công')
  //     queryClient.invalidateQueries('blogs-list-chef')
  //     handleCloseDelete()
  //   }
  // })
  // const handleDelete = () => {
  //   deleteBlogMutation.mutate()
  // }

  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-700 dark:text-gray-300'>{user.name}</div>
          <div className='text-xs text-gray-500'>@{user.user_name}</div>
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
        <td className='px-6 py-4 flex item-center whitespace-nowrap  text-sm font-medium'>
          {/* <Link to={`/chef/edit-blog/${blog._id}`} className='text-indigo-600 hover:text-indigo-900'>
            Sửa
          </Link> */}
          {/* <div onClick={handleOpenDelete} className='ml-2 cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>
          <span>
            {openDelete && (
              <DeleteConfirmBox
                closeModal={handleCloseDelete}
                handleDelete={handleDelete}
                isPending={deleteBlogMutation.isPending}
                title={'Xác nhận xóa'}
                subtitle={'Bạn có chắc chắn muốn xóa bài viết này'}
              />
            )}
          </span> */}
        </td>
      </tr>
    </>
  )
}
