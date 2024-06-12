import ModalLayout from '../../../../layouts/ModalLayout'

export default function ModalRequest({ handleCloseModal, request }) {
  // name, email, user_name, role

  return (
    <ModalLayout
      closeModal={handleCloseModal}
      className='modal-content overflow-y-auto scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Thông tin minh chứng</h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModal}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>

          <div className='border dark:border-gray-700 border-red-200 '></div>
          <section className='w-full mx-auto items-center '>
            <div className='mb-8'>
              <div className=''>
                <p className='lead mt-2 mb-1 whitespace-pre-line font-medium'> Link minh chứng: </p>
              </div>
              <div className='custorm-blog w-full overflow-x-auto scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-200 py-3 '>
                {request.proof}
              </div>
            </div>

            <div className=''>
              <div className='border-t '>
                <p className='lead mt-2 mb-1 font-medium'> Lý do: </p>
              </div>
              <span className='font-normal lead mb-3 whitespace-pre-line '>{request.reason}</span>
            </div>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
