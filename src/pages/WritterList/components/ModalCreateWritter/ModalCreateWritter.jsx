import { useForm } from 'react-hook-form'
import ModalLayout from '../../../../layouts/ModalLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRegisterUser } from '../../../../utils/rules'

import { createUserAdmin } from '../../../../apis/adminApi'
import { useMutation } from '@tanstack/react-query'
import Input from '../../../../components/InputComponents/Input'
import Loading from '../../../../components/GlobalComponents/Loading'
import { toast } from 'react-hot-toast'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { queryClient } from '../../../../main'

export default function ModalCreateWritter({ handleCloseModal }) {
  // name, email, user_name, role

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaRegisterUser)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body) => createUserAdmin(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const body = {
      ...data,
      role: 3
    }
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Tạo người viết bài thành công')
        handleCloseModal()
        queryClient.invalidateQueries({
          queryKey: ['writter-list']
        })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.errors
          if (formError?.name) {
            setError('name', {
              message: formError.name.msg,
              type: 'Server'
            })
          }
          if (formError?.email) {
            setError('email', {
              message: formError.email.msg,
              type: 'Server'
            })
          }
          if (formError?.user_name) {
            setError('user_name', {
              message: formError.user_name.msg,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModal}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Tạo người viết bài</h3>
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
            <form className=' w-full px-4 lg:px-5 py-5 rounded-lg mx-auto ' onSubmit={onSubmit} noValidate>
              <Input
                title='Tên người viết bài'
                placeholder='Nhập tên người viết bài'
                register={register}
                errors={errors.name}
                type='text'
                name='name'
                id='name'
              />
              <Input
                title='User name của người viết bài'
                placeholder='Nhập user name của người viết bài'
                register={register}
                errors={errors.user_name}
                type='text'
                name='user_name'
                id='user_name'
              />
              <Input
                title='Email của người viết bài'
                placeholder='Nhập email của người viết bài'
                register={register}
                errors={errors.email}
                type='email'
                name='email'
                id='email'
              />

              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-5 dark:text-pink-300 text-left'>
                Lưu ý: mật khẩu mặc định sẽ là 123456789Dd@
              </div>

              <div className='flex justify-center'>
                {registerAccountMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tạo tài khoản mới</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
