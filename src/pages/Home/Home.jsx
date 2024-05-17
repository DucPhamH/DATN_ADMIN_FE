import { getAdminProfile } from '../../apis/authApi'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data: userData } = useQuery({
    queryKey: ['me'],
    queryFn: () => {
      return getAdminProfile()
    }
  })
  console.log(userData?.data)
  return (
    <>
      <div className=' grid xl:mx-8 pt-2 xl:gap-6 xl:grid-cols-5'>hello</div>
    </>
  )
}
