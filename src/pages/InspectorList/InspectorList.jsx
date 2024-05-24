import { createSearchParams, useNavigate } from 'react-router-dom'
import { getAllUserAdmin } from '../../apis/adminApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { omit } from 'lodash'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from '../../components/GlobalComponents/Loading'
// import UserItem from './components/UserItem'
import Pagination from '../../components/GlobalComponents/Pagination/Pagination'
import useQueryConfig from '../../hooks/useQueryConfig'
import UserItem from './components/UserItem'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import ModalCreateInspector from './components/ModalCreateInspector'

export default function InspectorList() {
  const navigate = useNavigate()
  const [openCreate, setOpenCreate] = useState(false)

  const handleOpenCreate = () => {
    setOpenCreate(true)
  }

  const handleCloseCreate = () => {
    setOpenCreate(false)
  }

  const queryConfig = {
    ...useQueryConfig(),
    role: 4
  }

  const { data, isLoading } = useQuery({
    queryKey: ['inspector-list', queryConfig],
    queryFn: () => {
      return getAllUserAdmin(queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  console.log(queryConfig)
  console.log(data)

  const handleChangeSort = (e) => {
    navigate({
      pathname: '/inspector',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }

  const handleChangeStatus = (e) => {
    console.log(e.target.value)
    navigate({
      pathname: '/inspector',
      search: createSearchParams({
        ...queryConfig,
        status: e.target.value
      }).toString()
    })
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchUsers: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.searchUsers === '') {
      navigate({
        pathname: '/inspector',
        search: createSearchParams(omit({ ...queryConfig }, ['status', 'page', 'search'])).toString()
      })
      return
    }

    navigate({
      pathname: '/inspector',
      search: createSearchParams(omit({ ...queryConfig, search: data.searchUsers }, ['status', 'page'])).toString()
    })
  })

  console.log(queryConfig)

  return (
    <div className='h-screen mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='items-center'>
            <div className='mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Trang quản lý tài khoản người kiểm duyệt</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button
                  onClick={handleOpenCreate}
                  className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <div className='flex justify-center gap-2 items-center'>
                    <FaPlus /> <div>Tạo người kiểm duyệt mới</div>
                  </div>
                </button>
                <select
                  onChange={handleChangeSort}
                  defaultValue={queryConfig.sort}
                  id='sort'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='desc'>Mới nhất</option>
                  <option value='asc'>Lâu nhất</option>
                </select>
                <select
                  defaultValue={queryConfig.status}
                  onChange={handleChangeStatus}
                  id='status'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='1'>Đang hoạt động</option>
                  <option value='0'>Bị khóa</option>
                </select>

                <form onSubmit={onSubmitSearch} className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'>
                  <div className='relative'>
                    <input
                      autoComplete='off'
                      type='search'
                      id='search_input'
                      {...register('searchUsers')}
                      placeholder='Tìm kiếm người dùng...'
                      className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                    />
                    <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                      <AiOutlineSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className=' border-[2px] scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                <table className=' w-full shadow-md  divide-y divide-gray-200'>
                  <thead className='bg-gray-50 dark:bg-slate-800 '>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Tên người dùng
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Trạng thái
                      </th>

                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Vai trò
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                    {data?.data?.result.users.map((user) => {
                      return <UserItem key={user._id} user={user} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.users.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không còn người dùng</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination pageSize={data?.data.result.totalPage} queryConfig={queryConfig} url='/inspector' />
            </div>
          )}
        </div>
      </div>
      {openCreate && <ModalCreateInspector handleCloseModal={handleCloseCreate} />}
    </div>
  )
}
