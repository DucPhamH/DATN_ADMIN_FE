import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className='bg-white w-full h-screen '>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-content'>404</h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl '>
            Something&rsquo;s missing.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 '>
            Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
          </p>
          <div>
            <button
              onClick={() => navigate('/')}
              className='bg-gradient-to-r btn text-gray-100 from-[#ef571a] to-[#b11804]'
            >
              Trở về trang chủ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
