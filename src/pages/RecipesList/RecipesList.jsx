import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../components/GlobalComponents/Pagination'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { getCategoryRecipes, getRecipesForInspector } from '../../apis/inspectorApi'
import RecipeItem from './components/RecipeItem/RecipeItem'

export default function RecipeList() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category-recipe'],
    queryFn: () => {
      return getCategoryRecipes()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['recipes-list', queryConfig],
    queryFn: () => {
      return getRecipesForInspector(queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })
  console.log(data)

  // page,
  // limit,
  // sort,
  // search,
  // category_recipe_id,
  // difficult_level,
  // processing_food,
  // region,
  // interval_time
  const handleChangeSort = (e) => {
    navigate({
      pathname: '/recipes',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }

  const handleChangeDifficultLevel = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...omit(queryConfig, ['difficult_level'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...queryConfig,
          difficult_level: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeProcessingFood = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...omit(queryConfig, ['processing_food'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...queryConfig,
          processing_food: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeRegion = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...omit(queryConfig, ['region'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...queryConfig,
          region: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeIntervalTime = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...omit(queryConfig, ['interval_time'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...queryConfig,
          interval_time: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...omit(queryConfig, ['category_recipe_id'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/recipes',
        search: createSearchParams({
          ...queryConfig,
          category_recipe_id: e.target.value
        }).toString()
      })
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchRecipes: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.searchRecipes === '') {
      navigate({
        pathname: '/recipes',
        search: createSearchParams(
          omit({ ...queryConfig }, [
            'status',
            'category_recipe_id',
            'page',
            'difficult_level',
            'region',
            'processing_food',
            'interval_time',
            'search'
          ])
        ).toString()
      })
      return
    }
    navigate({
      pathname: '/recipes',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchRecipes }, [
          'status',
          'category_recipe_id',
          'page',
          'difficult_level',
          'region',
          'processing_food',
          'interval_time'
        ])
      ).toString()
    })
  })

  return (
    <div className='h-screen mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-6 '>
            <div className='col-span-2 lg:col-span-1 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Trang kiểm duyệt bài viết nấu ăn</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <select
                  onChange={handleChangeSort}
                  defaultValue={queryConfig.sort}
                  id='sort'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='desc'>Mới nhất</option>
                  <option value='asc'>Lâu nhất</option>
                </select>
                <select
                  defaultValue={queryConfig.processing_food || 'all'}
                  onChange={handleChangeProcessingFood}
                  id='status'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Cách làm</option>
                  <option value='Lẩu'>Lẩu</option>
                  <option value='Xào'>Xào</option>
                  <option value='Nướng'>Nướng</option>
                  <option value='Hấp'>Hấp</option>
                  <option value='Chiên'>Chiên</option>
                  <option value='Kho'>Kho</option>
                  <option value='Hầm'>Hầm</option>
                  <option value='Gỏi/Trộn'>Gỏi/Trộn</option>
                  <option value='Canh/Súp'>Canh/Súp</option>
                  <option value='Quay'>Quay</option>
                  <option value='Om/Rim'>Om/Rim</option>
                  <option value='Rang'>Rang</option>
                  <option value='Đồ sống'>Đồ sống</option>
                  <option value='Khác'>Khác</option>
                </select>
                <select
                  defaultValue={queryConfig.region || 'all'}
                  onChange={handleChangeRegion}
                  id='status'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Vùng miền</option>
                  <option value='0'>Miền Bắc</option>
                  <option value='1'>Miền Trung</option>
                  <option value='2'>Miền Nam</option>
                  <option value='3'>Món Á</option>
                  <option value='4'>Món Âu</option>
                </select>
                <select
                  defaultValue={queryConfig.interval_time || 'all'}
                  onChange={handleChangeIntervalTime}
                  id='status'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Thời gian</option>
                  <option value='0'>Dưới 15 phút</option>
                  <option value='1'>Từ 15 đến 30 phút</option>
                  <option value='2'>Từ 30 đến 60 phút</option>
                  <option value='3'>Từ 60 đến 120 phút</option>
                  <option value='4'>Trên 120 phút</option>
                </select>
                <select
                  defaultValue={queryConfig.difficult_level || 'all'}
                  onChange={handleChangeDifficultLevel}
                  id='status'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Độ khó</option>
                  <option value='0'>Dễ</option>
                  <option value='1'>Trung bình</option>
                  <option value='2'>Khó</option>
                </select>

                {isLoadingCategory ? (
                  <Loading className='flex ml-4' />
                ) : (
                  <select
                    defaultValue={queryConfig.category_recipe_id || 'all-category'}
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
                      {...register('searchRecipes')}
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
                    {data?.data?.result.recipes.map((recipe) => {
                      return <RecipeItem key={recipe._id} recipe={recipe} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.recipes.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination pageSize={data?.data.result.totalPage} queryConfig={queryConfig} url='/recipes' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
