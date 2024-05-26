import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import moment from 'moment'
import parse from 'html-react-parser'
import { MdHome, MdPerson } from 'react-icons/md'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { getRecipeDetailForInspector } from '../../apis/inspectorApi'

export default function RecipeDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['recipe-info', id],
    queryFn: () => {
      return getRecipeDetailForInspector(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  const location = useLocation()
  console.log(location)

  const checkNavigate = () => {
    // nếu location.pathname === 'albums/recipes/:id' thì navigate về trang quản lý album
    if (location.pathname === `/albums/recipes/${id}`) {
      return true
    }
    return false
  }
  return (
    <div className=''>
      <div className=''>
        {isLoading ? (
          <div className='mt-24'>
            <Loading />
          </div>
        ) : (
          <div className='relative'>
            <div className='bg-cover bg-center text-center overflow-hidden'>
              <img
                className='object-cover relative lg:rounded-md max-h-[15rem] md:max-h-[26rem] w-[100%]'
                src={data?.data.result[0].image}
                alt='image'
              />
              <div className='bg-yellow-100 flex font-medium justify-center items-center text-gray-600 absolute p-1.5 text-sm rounded-full top-0 left-0 m-3'>
                <AiOutlineClockCircle size={20} />
                <span className='ml-1'>{data?.data.result[0].time} phút</span>
              </div>
            </div>
            <div className='max-w-6xl mx-auto'>
              <div className=' bg-white dark:bg-color-primary rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal'>
                <div className='bg-white dark:bg-color-primary relative top-0 lg:-mt-32 py-5 px-3 md:p-5 sm:px-10'>
                  <header className='not-format'>
                    <div>
                      <span className='font-medium flex justify-between items-center flex-wrap md:gap-2 md:mb-0 text-gray-500'>
                        <div className='flex items-center flex-wrap mb-3 md:gap-2'>
                          <span className='mr-2'>{moment(data?.data.result[0].createdAt).format('LLLL')}</span>

                          <div className='flex text-sm text-blue-400 gap-2'>
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              {data?.data.result[0].category_recipe.name}
                            </span>{' '}
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              {data?.data.result[0].processing_food}
                            </span>{' '}
                            {data?.data.result[0].region === 0 ? (
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                                Miền bắc
                              </span>
                            ) : data?.data.result[0].region === 1 ? (
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                                Miền trung
                              </span>
                            ) : data?.data.result[0].region === 2 ? (
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                                Miền nam
                              </span>
                            ) : data?.data.result[0].region === 3 ? (
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                                Món Á
                              </span>
                            ) : (
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                                Món Âu
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            checkNavigate() ? navigate('/albums') : navigate('/recipes')
                          }}
                          className=' btn btn-sm mb-2 md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm '
                        >
                          <div className='flex justify-center gap-2 items-center'>
                            <MdHome />{' '}
                            <div>
                              {checkNavigate() ? 'Quay lại trang quản lý album' : 'Quay lại trang quản lý công thức'}
                            </div>
                          </div>
                        </button>
                      </span>

                      <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                        {data?.data.result[0].title}
                      </h1>
                      <div className='flex flex-wrap items-center pb-10  gap-2 justify-between'>
                        <div className='pt-3 text-sm flex gap-2 flex-wrap'>
                          <div className='flex font-medium pr-3 text-gray-500  border-r-2 flex-row items-center'>
                            <MdPerson className='text-lg text-green-500 mr-1' />
                            {data?.data.result[0].user.name}
                          </div>
                          <div className='flex flex-row items-center text-gray-500 font-medium pr-3 border-r-2  '>
                            <BsFillLightningChargeFill className=' text-yellow-500 mr-1' />
                            {data?.data.result[0].difficult_level === 0 ? (
                              <span className=''>Dễ</span>
                            ) : data?.data.result[0].difficult_level === 1 ? (
                              <span className=''>Trung bình</span>
                            ) : (
                              <span className=''>Khó</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                  <p className='lead mb-3 whitespace-pre-line font-medium'>{data?.data.result[0].description}</p>
                  <div className='custorm-blog '>{parse(data?.data?.result[0]?.content)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
