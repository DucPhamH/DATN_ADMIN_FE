import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

export default function PieChart({ usersBMI = {} }) {
  // const checkDataCalo = () => {
  //   if (workout?.calo_target - workout?.total_calo_burn < 0) {
  //     return workout?.calo_target
  //   }
  //   return workout?.calo_target - workout?.total_calo_burn
  // }

  console.log(usersBMI)

  // usersBMI =  {total: 7, underWeight: 0, normal: 6, overWeight: 0, obesity: 1}

  const data = {
    labels: ['BMI thấp', 'BMI bình thường', 'BMI cao', 'BMI béo phì'],
    datasets: [
      {
        label: 'BMI',
        data: [usersBMI?.underWeight, usersBMI?.normal, usersBMI?.overWeight, usersBMI?.obesity],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Biểu đồ phân phối BMI trên ${usersBMI?.total} người sử dụng`
      }
    }
  }
  return (
    <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-1 flex flex-col justify-center items-center lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Pie options={options} data={data} />
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
