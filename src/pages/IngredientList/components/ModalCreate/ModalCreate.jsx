import { useMutation, useQuery } from '@tanstack/react-query'
import Input from '../../../../components/InputComponents/Input'
import ModalLayout from '../../../../layouts/ModalLayout'
import { createIngredientsForWritter, getCategoryIngredients } from '../../../../apis/writterApi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateIngredient } from '../../../../utils/rules'
import Loading from '../../../../components/GlobalComponents/Loading'
import { toast } from 'react-hot-toast'

export default function ModalCreate({ handleCloseModalCreate }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCreateIngredient),
    defaultValues: {
      name: '',
      energy: '',
      protein: '',
      fat: '',
      carbohydrate: '',
      ingredient_category_ID: 'DEFAULT'
    }
  })

  const { data: category, isFetching } = useQuery({
    queryKey: ['ingredient-category'],
    queryFn: () => {
      return getCategoryIngredients()
    }
  })

  const createIngredientMutation = useMutation({
    mutationFn: (body) => createIngredientsForWritter(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    createIngredientMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        handleCloseModalCreate()
        toast.success('Tạo nguyên liệu thành công')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalCreate}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
              Tạo lịch tập luyện mới
            </h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalCreate}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>

          <div className='border dark:border-gray-700 border-red-200 '></div>
          <section className='w-full mx-auto items-center '>
            <form onSubmit={onSubmit} noValidate className='p-3'>
              <Input
                title='Nhập tên nguyên liệu'
                type='text'
                name='name'
                id='name'
                placeholder='Nhập tên nguyên liệu'
                register={register}
                errors={errors.name}
              />
              <div className='flex  items-center justify-between gap-1 mb-3'>
                <Input
                  title='Calo (cal)'
                  type='number'
                  name='energy'
                  id='energy'
                  placeholder='Nhập lượng calo'
                  register={register}
                  errors={errors.energy}
                />
                <Input
                  title='Protein (g)'
                  type='number'
                  name='protein'
                  id='protein'
                  placeholder='Nhập lượng protein'
                  register={register}
                  errors={errors.protein}
                />
              </div>
              <div className='flex  items-center justify-between gap-1 mb-3'>
                {' '}
                <Input
                  title='Chất béo (g)'
                  type='number'
                  name='fat'
                  id='fat'
                  placeholder='Nhập lượng chất béo'
                  register={register}
                  errors={errors.fat}
                />
                <Input
                  title='Carbohydrate (g)'
                  type='number'
                  name='carbohydrate'
                  id='carbohydrate'
                  placeholder='Nhập lượng carbohydrate'
                  register={register}
                  errors={errors.carbohydrate}
                />{' '}
              </div>

              <div className='sm:col-span-2 pb-2'>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn 1 thể loại nguyên liệu
                </div>
                {isFetching ? (
                  <Loading className='flex' />
                ) : (
                  <select
                    defaultValue='DEFAULT'
                    {...register('ingredient_category_ID')}
                    id='category'
                    className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='DEFAULT' disabled>
                      Chọn 1 thể loại
                    </option>
                    {category?.data?.result.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                )}
                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.ingredient_category_ID?.message}
                </div>
              </div>

              <div className='flex justify-center'>
                {createIngredientMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tạo lịch mới</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
