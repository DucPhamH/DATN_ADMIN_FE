import { BsPeopleFill } from 'react-icons/bs'
import { FaUserPen } from 'react-icons/fa6'
import { GiChefToque } from 'react-icons/gi'
import { MdFactCheck } from 'react-icons/md'
import PieChart from './components/PieChart/PieChart'
import BarChart from './components/BarChart/BarChart'
import { dashboard } from '../../apis/adminApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import LineChart from './components/LineChart/LineChart'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => {
      return dashboard()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })
  console.log(data?.data.result)
  return (
    <>
      <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
          <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
            <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-orange-500 left-4 -top-6'>
              <BsPeopleFill size={25} className='min-w-max' />
            </div>
            <div className='mt-8'>
              <p className='text-xl font-semibold my-2'>Tài khoản người dùng</p>
              <div>
                <div className='flex space-x-2 text-gray-400 text-sm'>
                  <span className='text-black dark:text-gray-300 font-medium'>Số lượng:</span>
                  <p>{data?.data.result.account.users.total} tài khoản</p>
                </div>
                <div className='flex space-x-2 text-gray-400 text-sm my-2'>
                  <span className='text-black dark:text-gray-300 font-medium'>Đang hoạt động:</span>
                  <p>{data?.data.result.account.users.active} tài khoản</p>
                </div>
              </div>

              <div className='border-t-2 dark:border-gray-500' />
              <div className='flex justify-between gap-4'>
                <div className='my-2'></div>
                <div className='my-2 min-w-[80px]'></div>
              </div>
            </div>
          </div>
          <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
            <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-orange-500 left-4 -top-6'>
              <GiChefToque size={25} className='min-w-max' />
            </div>
            <div className='mt-8'>
              <p className='text-xl font-semibold my-2'>Tài khoản đầu bếp</p>
              <div>
                <div className='flex space-x-2 text-gray-400 text-sm'>
                  <span className='text-black dark:text-gray-300 font-medium'>Số lượng:</span>
                  <p>{data?.data.result.account.chefs.total} tài khoản</p>
                </div>
                <div className='flex space-x-2 text-gray-400 text-sm my-2'>
                  <span className='text-black dark:text-gray-300 font-medium'>Đang hoạt động:</span>
                  <p>{data?.data.result.account.chefs.active} tài khoản</p>
                </div>
              </div>

              <div className='border-t-2 dark:border-gray-500' />
              <div className='flex justify-between gap-4'>
                <div className='my-2'></div>
                <div className='my-2 min-w-[80px]'></div>
              </div>
            </div>
          </div>
          <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
            <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-orange-500 left-4 -top-6'>
              <MdFactCheck size={25} className='min-w-max' />
            </div>

            <div className='mt-8'>
              <p className='text-xl font-semibold my-2'>Tài khoản người quản lý</p>
              <div>
                <div className='flex space-x-2 text-gray-400 text-sm'>
                  <span className='text-black dark:text-gray-300 font-medium'>Số lượng:</span>
                  <p>{data?.data.result.account.inspectors.total} tài khoản</p>
                </div>
                <div className='flex space-x-2 text-gray-400 text-sm my-2'>
                  <span className='text-black dark:text-gray-300 font-medium'>Đang hoạt động:</span>
                  <p>{data?.data.result.account.inspectors.active} tài khoản</p>
                </div>
              </div>

              <div className='border-t-2 dark:border-gray-500' />
              <div className='flex justify-between gap-4'>
                <div className='my-2'></div>
                <div className='my-2 min-w-[80px]'></div>
              </div>
            </div>
          </div>
          <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
            <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-orange-500 left-4 -top-6'>
              <FaUserPen size={25} className='min-w-max' />
            </div>

            <div className='mt-8'>
              <p className='text-xl font-semibold my-2'>Tài khoản người viết bài</p>
              <div>
                <div className='flex space-x-2 text-gray-400 text-sm'>
                  <span className='text-black dark:text-gray-300 font-medium'>Số lượng:</span>
                  <p>{data?.data.result.account.writters.total} tài khoản</p>
                </div>
                <div className='flex space-x-2 text-gray-400 text-sm my-2'>
                  <span className='text-black dark:text-gray-300 font-medium'>Đang hoạt động:</span>
                  <p>{data?.data.result.account.writters.active} tài khoản</p>
                </div>
              </div>

              <div className='border-t-2 dark:border-gray-500' />
              <div className='flex justify-between gap-4'>
                <div className='my-2'>
                  {/* <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>{checkNoteBMI()}</p> */}
                </div>
                <div className='my-2 min-w-[80px]'>
                  {/* <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.BMI} title='kg/m^2' /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid w-full grid-cols-1 items-center  xl:grid-cols-3'>
          <PieChart usersBMI={data?.data.result?.usersBMI} />
          <BarChart food={data?.data.result?.food} />
        </div>
        <div className='grid w-full grid-cols-1 items-center'>
          <LineChart posts={data?.data.result?.posts} />
        </div>
      </div>
    </>
  )
}
