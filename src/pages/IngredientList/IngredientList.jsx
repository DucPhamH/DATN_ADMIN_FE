import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCategoryIngredients, getIngredients } from '../../apis/writterApi'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from '../../hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { omit } from 'lodash'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from '../../components/GlobalComponents/Loading'

import Pagination from '../../components/GlobalComponents/Pagination'
import { FaPlus } from 'react-icons/fa6'
import IngerdientItem from './components/IngerdientItem'
import { useState } from 'react'
import ModalCreate from './components/ModalCreate/ModalCreate'

export default function IngredientList() {
  const navigate = useNavigate()
  const queryConfig = omit(useQueryConfig(), ['sort'])
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true)
  }

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false)
  }

  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['ingredient-category'],
    queryFn: () => {
      return getCategoryIngredients()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['list-ingredients', queryConfig],
    queryFn: () => {
      return getIngredients(queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      navigate({
        pathname: '/ingredients',
        search: createSearchParams({
          ...omit(queryConfig, ['ingredient_category_ID'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/ingredients',
        search: createSearchParams({
          ...queryConfig,
          ingredient_category_ID: e.target.value
        }).toString()
      })
    }
  }

  const { register: registerIngredients, handleSubmit: handleSubmitIngredients } = useForm({
    defaultValues: {
      searchIngredients: queryConfig.search || ''
    }
  })

  const onSubmitSearch = handleSubmitIngredients((data) => {
    if (data.searchIngredients === '') {
      navigate({
        pathname: '/ingredients',
        search: createSearchParams(omit({ ...queryConfig }, ['ingredient_category_ID', 'page', 'search'])).toString()
      })
      return
    }
    navigate({
      pathname: '/ingredients',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchIngredients }, ['ingredient_category_ID', 'page'])
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
                <span>Trang thêm nguyên liệu món ăn</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button
                  onClick={handleOpenModalCreate}
                  className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <div className='flex justify-center gap-2 items-center'>
                    <FaPlus /> <div>Tạo nguyên liệu</div>
                  </div>
                </button>
                {isLoadingCategory ? (
                  <Loading className='flex ml-4' />
                ) : (
                  <select
                    defaultValue={queryConfig.ingredient_category_ID || 'all-category'}
                    onChange={handleChangeCategory}
                    id='category'
                    className='select select-sm my-2  bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='all-category'>Tất cả thể loại</option>
                    {categoryData?.data?.result.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      )
                    })}
                  </select>
                )}
                <form
                  id='form-activity'
                  onSubmit={onSubmitSearch}
                  noValidate
                  className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'
                >
                  <div className='relative'>
                    <input
                      autoComplete='off'
                      type='search'
                      id='search_input'
                      {...registerIngredients('searchIngredients')}
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
                        Tên nguyên liệu
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Năng lượng
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Protein
                      </th>

                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Chất béo
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Carbohydrate
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
                    {data?.data?.result.ingredients.map((ingerdient) => {
                      return <IngerdientItem key={ingerdient._id} ingredient={ingerdient} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.ingredients.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có nguyên liệu nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination pageSize={data?.data.result.totalPage} queryConfig={queryConfig} url='/ingredients' />
            </div>
          )}
        </div>
      </div>
      {openModalCreate && <ModalCreate handleCloseModalCreate={handleCloseModalCreate} />}
    </div>
  )
}
