import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChart({ food = {} }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ lượng bài viết trong hệ thống'
      }
    }
  }
  // food là 1 object chứa các

  //   "food": {
  //     "recipes": {
  //         "total": 18,
  //         "pending": 0,
  //         "reject": 1
  //     },
  //     "albums": {
  //         "total": 4,
  //         "pending": 0,
  //         "reject": 0
  //     },
  //     "blogs": {
  //         "total": 10,
  //         "pending": 0,
  //         "reject": 1
  //     }
  // },

  const labels = Object.keys(food)

  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: labels.map((label) => food[label].total),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Pending',
        data: labels.map((label) => food[label].pending),
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      },
      {
        label: 'Reject',
        data: labels.map((label) => food[label].reject),
        backgroundColor: 'rgba(255, 206, 86, 0.5)'
      }
    ]
  }

  console.log(food)
  return (
    <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-2 flex flex-col justify-center items-center   lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Bar options={options} data={data} />
      <div>
        {/* <h1 className='text-center text-gray-500 mt-5 font-semibold'>
      {workout?.total_calo_burn === 0
        ? 'Bạn chưa thực hiện bài tập nào'
        : `Lượng calo đã đốt cháy: ${workout?.total_calo_burn}/${workout?.calo_target} calories`}
    </h1> */}
      </div>
    </div>
  )
}
