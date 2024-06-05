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
import { Line } from 'react-chartjs-2'

import moment from 'moment'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)
export default function LineChart({ posts = [] }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ lượng bài viết, câu hỏi trên diễn đàn trong 10 ngày gần nhất'
      }
    }
  }
  // post là 1 object chứa các object có key là _id và count là số lượng bài viết
  //  posts = {
  //     {_id: "2024-05-31", count: 2}.
  //    {_id: "2024-06-01", count: 1}
  //   }

  const labels = posts?.map((item) => moment(item._id).format('DD/MM/YYYY'))

  const data = {
    labels,
    datasets: [
      {
        label: 'Bài viết, câu hỏi',
        data: posts?.map((item) => item.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }
  return (
    <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100  flex flex-col items-center gap-2 justify-center  overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Line options={options} data={data} />
    </div>
  )
}
