import { useParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'

import { getAlbumDetailForInspector, getRecipesInAlbum } from '../../apis/inspectorApi'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import Pagination from '../../components/GlobalComponents/Pagination'
import RecipeItem from './components/RecipeItem'

export default function AlbumDetail() {
  const { id } = useParams()
  const queryConfig = omit(useQueryConfig(), 'sort')

  const { data, isLoading: isLoadingAlbum } = useQuery({
    queryKey: ['album-info', id],
    queryFn: () => {
      return getAlbumDetailForInspector(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  const album = data?.data.result[0]

  const { data: recipeData, isLoading } = useQuery({
    queryKey: ['recipes-album', { album_id: id, ...queryConfig }],
    queryFn: () => {
      return getRecipesInAlbum({
        album_id: id,
        ...queryConfig
      })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  console.log(recipeData)

  return (
    <div className='h-full mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        {isLoadingAlbum ? (
          <Loading />
        ) : (
          <div className=''>
            <div className=''>
              <div className='text-xl font-medium mb-2'>
                <span>Bạn đang xem album: {album.title}</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
              <div className='flex gap-5 justify-between'>
                <div className=' text-red-600 flex gap-2 dark:text-red-300 font-medium mb-2'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                    {album.category_album}
                  </span>

                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                    {album.total_bookmarks} lượt lưu
                  </span>
                </div>
              </div>

              <div className=' my-4 dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
                <div className='m-1 flex  gap-2'>{album.description}</div>
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
                        {recipeData?.data?.result.recipes.map((recipe) => {
                          return <RecipeItem key={recipe._id} recipe={recipe} />
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {recipeData?.data.result.recipes.length === 0 && (
                <div className='flex justify-center items-center py-4'>
                  <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
                </div>
              )}
              {recipeData?.data.result.totalPage > 1 && (
                <div className='flex justify-center items-center'>
                  <Pagination
                    pageSize={recipeData?.data.result.totalPage}
                    queryConfig={queryConfig}
                    url={`/albums/${id}`}
                  />
                </div>
              )}
            </div>
            <div className='w-full'></div>
          </div>
        )}
      </div>
    </div>
  )
}
