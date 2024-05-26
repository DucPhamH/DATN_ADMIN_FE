import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../components/GlobalComponents/Pagination'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { getBlogsForInspector, getCategoryBlogs } from '../../apis/inspectorApi'
import BlogItem from './components/BlogItem/BlogItem'

export default function BlogList() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category-blog'],
    queryFn: () => {
      return getCategoryBlogs()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['blogs-list', queryConfig],
    queryFn: () => {
      return getBlogsForInspector(queryConfig)
    },
    placeholderData: keepPreviousData
  })

  const handleChangeSort = (e) => {
    navigate({
      pathname: '/blogs',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      navigate({
        pathname: '/blogs',
        search: createSearchParams({
          ...omit(queryConfig, ['category_blog_id'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/blogs',
        search: createSearchParams({
          ...queryConfig,
          category_blog_id: e.target.value
        }).toString()
      })
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchBlogs: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.searchBlogs === '') {
      navigate({
        pathname: '/blogs',
        search: createSearchParams(
          omit({ ...queryConfig }, ['status', 'category_blog_id', 'page', 'search'])
        ).toString()
      })
      return
    }

    navigate({
      pathname: '/blogs',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchBlogs }, ['status', 'category_blog_id', 'page'])
      ).toString()
    })
  })

  console.log(queryConfig)

  return (
    <div className='h-screen mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-6 items-center'>
            <div className='col-span-2 lg:col-span-1 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Trang kiểm duyệt blog</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <select
                  onChange={handleChangeSort}
                  defaultValue={queryConfig.sort}
                  id='sort'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='desc'>Mới nhất</option>
                  <option value='asc'>Lâu nhất</option>
                </select>
                {isLoadingCategory ? (
                  <Loading className='flex ml-4' />
                ) : (
                  <select
                    defaultValue={queryConfig.category_blog_id || 'all-category'}
                    onChange={handleChangeCategory}
                    id='category'
                    className='select  select-sm  bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='all-category'>Tất cả thể loại</option>
                    {category?.data?.result.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                )}
                <form onSubmit={onSubmitSearch} className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'>
                  <div className='relative'>
                    <input
                      autoComplete='off'
                      type='search'
                      id='search_input'
                      {...register('searchBlogs')}
                      placeholder='Tìm kiếm bài viết'
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
                        Người viết
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Tên bài viết
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
                        Thể loại
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Ngày tạo
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
                    {data?.data?.result.blogs.map((blog) => {
                      return <BlogItem key={blog._id} blog={blog} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.blogs.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination pageSize={data?.data.result.totalPage} queryConfig={queryConfig} url='/blogs' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
