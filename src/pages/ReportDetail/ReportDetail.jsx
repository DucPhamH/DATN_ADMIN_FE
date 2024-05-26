import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useNavigate, useParams } from 'react-router-dom'
import { getReportPostDetail } from '../../apis/inspectorApi'
import { IoMdHome } from 'react-icons/io'
import useravatar from '../../assets/images/useravatar.jpg'
import Loading from '../../components/GlobalComponents/Loading'

export default function ReportDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['report-info', id],
    queryFn: () => {
      return getReportPostDetail(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  console.log(data)
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {' '}
          <div className='flex flex-wrap justify-between items-center pt-3 px-8'>
            <div className='mb-2'>
              <div className='text-xl md:text-2xl font-medium mb-2'>
                <span>Trang chi tiết bài viết bị báo cáo</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[50%] border-red-300 '></div>
            </div>
            <button
              onClick={() => navigate('/reports')}
              className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
            >
              <div className='flex gap-1 items-center justify-center'>
                <IoMdHome />
                Trở về trang danh sách báo cáo
              </div>
            </button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 px-4 gap-4'>
            <div className='blog-view  max-w-3xl w-full pb-16 p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
              <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Nội dung bài viết</h2>
              <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
                <div>
                  <div className='flex gap-2 items-center'>
                    <div className='inline-block'>
                      <img
                        className='rounded-full object-cover max-w-none w-8 h-8'
                        src={data?.data.result[0].user.avatar === '' ? useravatar : data?.data.result[0].user.avatar}
                      />
                    </div>
                    <div>
                      <div className='text-sm text-gray-700 dark:text-gray-300'>{data?.data.result[0].user.name}</div>
                      <div className='text-xs text-gray-500'>@{data?.data.result[0].user.user_name}</div>
                    </div>
                  </div>
                </div>
                <div className='whitespace-pre-line'>
                  <span className='font-medium'>Nội dung bài viết: </span>
                  {data?.data.result[0].content === '' ? 'Không có nội dung' : data?.data.result[0].content}
                </div>
                <div>
                  <span className='font-medium'>Ảnh bài viết: </span>
                  <div className='grid gap-2 grid-cols-2 lg:grid-cols-3'>
                    {data?.data.result[0].images.length === 0 ? (
                      <div>Không có ảnh</div>
                    ) : (
                      data?.data.result[0].images.map((item, index) => (
                        <img key={index} className='object-cover w-full h-40 rounded-lg' src={item} />
                      ))
                    )}
                  </div>
                </div>
                {data?.data.result[0].type === 1 && (
                  <>
                    {' '}
                    <div className='whitespace-pre-line'>
                      <span className='font-medium'>Nội dung bài viết được chia sẻ: </span>
                      {data?.data.result[0]?.parent_post?.content === ''
                        ? 'Không có nội dung'
                        : data?.data.result[0].parent_post?.content}
                    </div>
                    <div>
                      <span className='font-medium'>Ảnh bài viết được chia sẻ: </span>
                      <div className='grid gap-2 grid-cols-2 lg:grid-cols-3'>
                        {data?.data.result[0].parent_images.length === 0 ? (
                          <div>Không có ảnh</div>
                        ) : (
                          data?.data.result[0].parent_images.map((item, index) => (
                            <img key={index} className='object-cover w-full h-40 rounded-lg' src={item} />
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className=' blog-view  max-w-3xl w-full pb-16 dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
              <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Nội dung báo cáo</h2>
              <div className='grid mx-5 gap-4 sm:grid-cols-1 sm:gap-6 '>
                {data?.data.result[0].report_post.map((item, index) => (
                  <div key={index} className='border p-2 rounded-lg shadow-md'>
                    <div className='flex gap-2 items-center'>
                      <div className='inline-block'>
                        <img
                          className='rounded-full object-cover max-w-none w-8 h-8'
                          src={item.user.avatar === '' ? useravatar : item.user.avatar}
                        />
                      </div>
                      <div>
                        <div className='text-sm text-gray-700 dark:text-gray-300'>{item.user.name}</div>
                        <div className='text-xs text-gray-500'>Lý do: {item.reason}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
