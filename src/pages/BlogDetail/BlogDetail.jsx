import { useNavigate, useParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import moment from 'moment'
import parse from 'html-react-parser'
import { MdHome, MdPerson } from 'react-icons/md'
import { getBlogDetailForInspector } from '../../apis/inspectorApi'

export default function BlogDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isFetching: isFetchingBlog } = useQuery({
    queryKey: ['blog-info', id],
    queryFn: () => {
      return getBlogDetailForInspector(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  return (
    <>
      <div className='grid xl:mx-4 pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-6'>
          <main className='pt-8 xl:mx-12 xl:px-10 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            {isFetchingBlog ? (
              <Loading />
            ) : (
              <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
                <article className='mx-auto w-full '>
                  <header className='mb-3 not-format'>
                    <div>
                      <span className='font-medium flex justify-between items-center flex-wrap md:gap-2 md:mb-0 text-gray-500'>
                        <div className='flex items-center flex-wrap mb-3 md:gap-2'>
                          <span className='font-medium text-gray-500'>
                            {moment(data?.data.result[0].createdAt).format('LLLL')}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            navigate('/blogs')
                          }}
                          className=' btn btn-sm mb-2 md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm '
                        >
                          <div className='flex justify-center gap-2 items-center'>
                            <MdHome /> <div>Trở về trang quản lý blog</div>
                          </div>
                        </button>
                      </span>

                      <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                        {data?.data.result[0].title}
                      </h1>
                      <div className='pt-3 text-sm flex gap-2 flex-wrap'>
                        <div className='flex font-medium pr-3 text-gray-500  border-r-2 flex-row items-center'>
                          <MdPerson className='text-lg text-green-500 mr-1' />
                          {data?.data.result[0].user.name}
                        </div>
                      </div>
                    </div>
                  </header>

                  <p className='lead mb-3 whitespace-pre-line font-medium'>{data?.data.result[0].description}</p>
                  <div className='flex flex-col items-center my-6 justify-center w-[100%]'>
                    <img
                      className='object-cover rounded-md max-h-[28rem] w-[100%]'
                      src={data?.data.result[0].image}
                      alt='image'
                    />
                  </div>
                  <div className='custorm-blog '>{parse(data?.data.result[0].content)}</div>
                </article>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
