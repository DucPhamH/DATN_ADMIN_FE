import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import { IoMdHome } from 'react-icons/io'
import Input from '../../components/InputComponents/Input'
import TextArea from '../../components/InputComponents/TextArea'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateRecipe } from '../../utils/rules'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CreateConfirmBox from '../../components/GlobalComponents/CreateConfirmBox'
import { modules, formats } from '../../constants/editorToolbar'

import {
  createRecipesForWritter,
  getCategoryIngredients,
  getCategoryRecipes,
  getIngredients
} from '../../apis/writterApi'
import { AiOutlineSearch } from 'react-icons/ai'
import { omit } from 'lodash'
import PaginationNotUrl from '../../components/GlobalComponents/PaginationNotUrl'
import { FaPlus } from 'react-icons/fa6'

export default function CreateRecipe() {
  const navigate = useNavigate()
  const [mealState, setMealState] = useState([])
  const [openCreate, setOpenCreate] = useState(false)
  const [query, setQuery] = useState({
    page: '1'
  })

  const { data: categoryData } = useQuery({
    queryKey: ['ingredient-category'],
    queryFn: () => {
      return getCategoryIngredients()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['list-ingredients', query],
    queryFn: () => {
      return getIngredients(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { register: registerIngredients, handleSubmit: handleSubmitIngredients } = useForm({
    defaultValues: {
      searchIngredients: query.search || ''
    }
  })
  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      setQuery((prev) => {
        return omit(prev, ['ingredient_category_ID'])
      })
    } else {
      setQuery((prev) => {
        return { ...prev, ingredient_category_ID: e.target.value }
      })
    }
  }

  const onSubmitSearch = handleSubmitIngredients((data) => {
    if (data.searchIngredients === '') {
      return setQuery((prev) => omit(prev, ['ingredient_category_ID', 'page', 'search']))
    }
    setQuery((prev) => {
      return omit({ ...prev, search: data.searchIngredients }, ['ingredient_category_ID', 'page'])
    })
  })
  const handleOpenCreate = () => {
    setOpenCreate(true)
  }
  const handleCloseCreate = () => {
    setOpenCreate(false)
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCreateRecipe),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      category_recipe_id: 'DEFAULT',
      content: '',
      video: '',
      time: '',
      difficult_level: 'DEFAULT',
      region: 'DEFAULT',
      processing_food: 'DEFAULT',
      energy: '',
      protein: '',
      fat: '',
      carbohydrate: '',
      unit: 'DEFAULT',
      quantity: ''
    }
  })

  console.log(mealState)

  const createRecipeMutation = useMutation({
    mutationFn: (body) => createRecipesForWritter(body)
  })
  const onSubmit = handleSubmit((data) => {
    var formData = new FormData()
    console.log(data)

    if (mealState.length === 0) {
      return toast.error('Vui lòng chọn ít nhất 1 nguyên liệu')
    }

    const newData = {
      title: data.title,
      image: data.image[0],
      description: data.description,
      category_recipe_id: data.category_recipe_id,
      content: data.content,
      video: data.video,
      time: Number(data.time),
      difficult_level: Number(data.difficult_level),
      region: Number(data.region),
      processing_food: data.processing_food,
      energy: Number(data.energy),
      protein: Number(data.protein),
      fat: Number(data.fat),
      carbohydrate: Number(data.carbohydrate),
      unit: data.unit,
      quantity: Number(data.quantity),
      // loại bỏ id mealState
      ingredients: mealState.map((item) => {
        return {
          name: item.meal_name,
          energy: item.energy,
          protein: item.protein,
          fat: item.fat,
          carbohydrate: item.carbohydrate
        }
      })
    }

    console.log(newData)
    formData.append('title', newData.title)
    formData.append('image', newData.image)
    formData.append('description', newData.description)
    formData.append('category_recipe_id', newData.category_recipe_id)
    formData.append('content', newData.content)
    formData.append('video', newData.video)
    formData.append('time', newData.time)
    formData.append('difficult_level', newData.difficult_level)
    formData.append('region', newData.region)
    formData.append('processing_food', newData.processing_food)
    formData.append('energy', newData.energy)
    formData.append('protein', newData.protein)
    formData.append('fat', newData.fat)
    formData.append('carbohydrate', newData.carbohydrate)
    formData.append('unit', newData.unit)
    formData.append('quantity', newData.quantity)
    formData.append('ingredients', JSON.stringify(newData.ingredients))

    createRecipeMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data)
        reset()
        handleCloseCreate()
        toast.success('Tạo bài viết thành công')
        setMealState([])
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })
  const onEditorStateChange = (editorState) => {
    setValue('content', editorState)
  }

  const content = watch('content')
  const descriptionWatch = watch('description')
  const titleWatch = watch('title')
  const imageWatch = watch('image')

  console.log(imageWatch)

  const { data: category, isFetching } = useQuery({
    queryKey: ['category-recipe'],
    queryFn: () => {
      return getCategoryRecipes()
    }
  })

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center pt-3 px-8'>
        <div className='mb-2'>
          <div className='text-xl md:text-2xl font-medium mb-2'>
            <span>Trang tạo bài viết nấu ăn</span>
          </div>
          <div className='border-b-[3px] mb-2 w-[50%] border-red-300 '></div>
        </div>
        <button
          onClick={() => navigate('/recipes-writter')}
          className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <IoMdHome />
            Trở về trang danh sách nấu ăn
          </div>
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 px-4 gap-4'>
        <div className='blog-view  max-w-3xl w-full pb-16 p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Tạo bài viết nấu ăn</h2>
          <form onSubmit={onSubmit} noValidate>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-2'>
              <div className='sm:col-span-2'>
                <Input
                  title='Nhập tiêu đề'
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Nhập tiêu đề bài viết'
                  register={register}
                  errors={errors.title}
                />
              </div>
            </div>
            <div className='sm:col-span-2 pb-2'>
              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Chọn 1 ảnh bài viết (định dạng ảnh jpeg)
              </div>
              <input
                className='file-input file-input-sm file-input-bordered file-input-ghost w-full max-w-xs'
                type='file'
                accept='image/jpeg'
                {...register('image')}
              />

              <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                {errors.image?.message}
              </div>
            </div>
            <div className='sm:col-span-2'>
              <Input
                title='Nhập link video (nếu có)'
                type='text'
                name='video'
                id='video'
                placeholder='Nhập link video bài viết'
                register={register}
                errors={errors.video}
              />
            </div>
            <div className='sm:col-span-2'>
              <Input
                title='Thời gian nấu'
                type='number'
                name='time'
                id='time'
                placeholder='Nhập thời gian nấu'
                register={register}
                errors={errors.time}
              />
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn mức độ khó
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('difficult_level')}
                  id='difficult_level'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn mức độ khó
                  </option>
                  <option value='0'>Dễ</option>
                  <option value='1'>Trung bình</option>
                  <option value='2'>Khó</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.difficult_level?.message}
                </div>
              </div>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn vùng miền
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('region')}
                  id='region'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn vùng miền
                  </option>
                  <option value='0'>Miền Bắc</option>
                  <option value='1'>Miền Trung</option>
                  <option value='2'>Miền Nam</option>
                  <option value='3'>Món Á</option>
                  <option value='4'>Món Âu</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.region?.message}
                </div>
              </div>
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn 1 thể loại nấu ăn
                </div>

                {isFetching ? (
                  <Loading className='flex' />
                ) : (
                  <select
                    defaultValue='DEFAULT'
                    {...register('category_recipe_id')}
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
                  {errors.category_recipe_id?.message}
                </div>
              </div>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn cách chế biến
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('processing_food')}
                  id='processing_food'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn cách chế biến
                  </option>
                  <option value='Lẩu'>Lẩu</option>
                  <option value='Xào'>Xào</option>
                  <option value='Nướng'>Nướng</option>
                  <option value='Hấp'>Hấp</option>
                  <option value='Chiên'>Chiên</option>
                  <option value='Kho'>Kho</option>
                  <option value='Hầm'>Hầm</option>
                  <option value='Gỏi/Trộn'>Gỏi/Trộn</option>
                  <option value='Canh/Súp'>Canh/Súp</option>
                  <option value='Quay'>Quay</option>
                  <option value='Om/Rim'>Om/Rim</option>
                  <option value='Rang'>Rang</option>
                  <option value='Đồ sống'>Đồ sống</option>
                  <option value='Khác'>Khác</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.processing_food?.message}
                </div>
              </div>
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <Input
                title='Nhập năng lượng'
                type='number'
                name='energy'
                id='energy'
                placeholder='Nhập năng lượng'
                register={register}
                errors={errors.energy}
              />
              <Input
                title='Nhập protein'
                type='number'
                name='protein'
                id='protein'
                placeholder='Nhập protein'
                register={register}
                errors={errors.protein}
              />
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <Input
                title='Nhập chất béo'
                type='number'
                name='fat'
                id='fat'
                placeholder='Nhập chất béo'
                register={register}
                errors={errors.fat}
              />
              <Input
                title='Nhập carbohydrate'
                type='number'
                name='carbohydrate'
                id='carbohydrate'
                placeholder='Nhập carbohydrate'
                register={register}
                errors={errors.carbohydrate}
              />
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <div className='mb-2'>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Nhập đơn vị
                </div>
                <select
                  defaultValue='DEFAULT'
                  {...register('unit')}
                  className='select select-sm mb-1 border border-gray-300 bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT'>Nhập đơn vị</option>
                  <option value='gram'>gram</option>
                  <option value='ml'>ml</option>
                  <option value='cái'>cái</option>
                  <option value='đĩa'>đĩa</option>
                  <option value='ổ'>ổ</option>
                  <option value='lát'>lát</option>
                  <option value='gói'>gói</option>
                  <option value='tách/chén'>tách/chén</option>
                  <option value='cốc/ly'>cốc/ly</option>
                  <option value='lon'>lon</option>
                  <option value='tô/bát'>tô/bát</option>
                  <option value='hũ/hộp'>hũ/hộp</option>
                  <option value='chai'>chai</option>
                  <option value='cuốn'>cuốn</option>
                  <option value='viên'>viên</option>
                  <option value='trái/quả'>trái/quả</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.unit?.message}
                </div>
              </div>
              <Input
                title='Nhập số lượng'
                type='number'
                name='quantity'
                id='quantity'
                placeholder='Nhập số lượng'
                register={register}
                errors={errors.quantity}
              />
            </div>

            <div className='sm:col-span-2'>
              <TextArea
                title='Nhập mô tả'
                placeholder='Nhập mô tả bài viết'
                name='description'
                id='description'
                register={register}
                errors={errors.description}
              />
            </div>

            <div className='sm:col-span-2 pb-2'>
              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Nhập nội dung bài viết
              </div>
              <ReactQuill
                className=''
                theme='snow'
                value={content}
                onChange={onEditorStateChange}
                modules={modules}
                formats={formats}
              />
              <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                {errors.content?.message}
              </div>
            </div>

            <div className='sm:col-span-2 mb-10'>
              <div className='w-full  flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Nguyên liệu được thêm
                </label>
                {mealState.length === 0 ? (
                  <div className='text-gray-500 dark:text-gray-300'>Chưa có nguyên liệu nào</div>
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên hoạt động
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Lượng calories
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Xóa
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                      {mealState.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.meal_name}
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.energy} cal
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <button
                                onClick={() => {
                                  setMealState((prev) => prev.filter((i) => i.id !== item.id))
                                }}
                                className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
                              >
                                <div className='flex gap-1 items-center justify-center'>X</div>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {openCreate && (
              <CreateConfirmBox
                title='Xác nhận tạo bài viết'
                subtitle='Bạn có chắc chắn muốn tạo bài viết này không?'
                handleCreate={onSubmit}
                closeModal={handleCloseCreate}
                isPending={createRecipeMutation.isPending}
              />
            )}
          </form>
          <button
            onClick={handleOpenCreate}
            className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
          >
            <div className='flex gap-1 items-center justify-center'>Tạo bài viết</div>
          </button>
        </div>

        <div className=' blog-view  max-w-3xl w-full pb-16  dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <div>
            <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>
              Bảng tham khảo món ăn: (giá trị dinh dưỡng trên 100g)
            </h2>
            <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
              <main className=' '>
                <div className='mx-1'>
                  <div className='font-medium mb-2'></div>
                  <div className='mb-2'>
                    <div className='flex flex-wrap gap-3  items-center'>
                      <form
                        id='form-activity'
                        onSubmit={onSubmitSearch}
                        noValidate
                        className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'
                      >
                        <div className='relative'>
                          <input
                            autoComplete='off'
                            type='search'
                            id='search_input'
                            {...registerIngredients('searchIngredients')}
                            placeholder='Tìm kiếm bài viết'
                            className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                          />
                          <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                            <AiOutlineSearch />
                          </button>
                        </div>
                      </form>

                      <select
                        defaultValue={query.ingredient_category_ID || 'all-category'}
                        onChange={handleChangeCategory}
                        id='category'
                        className='select select-sm my-2  bg-white dark:bg-slate-800 dark:border-none'
                      >
                        <option value='all-category'>Tất cả thể loại</option>
                        {categoryData?.data?.result.map((category) => {
                          return (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='border-[2px] my-3 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                    {isLoading ? (
                      <Loading className='w-full my-3 flex justify-center' />
                    ) : (
                      <table className=' w-full shadow-md  divide-y divide-gray-200'>
                        <thead className='bg-gray-50 dark:bg-slate-800 '>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                            >
                              Tên hoạt động
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                            >
                              Lượng calories
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                            >
                              Thêm
                            </th>
                          </tr>
                        </thead>

                        <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                          {data?.data?.result.ingredients.map((ingredient) => {
                            return (
                              <IngredientItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                setMealState={setMealState}
                                mealState={mealState}
                              />
                            )
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {data?.data.result.ingredients.length === 0 && (
                    <div className='flex justify-center items-center py-4'>
                      <div className='text-gray-500 dark:text-gray-300'>Không có món ăn nào</div>
                    </div>
                  )}
                  {data?.data.result.totalPage > 1 && (
                    <div className='flex justify-center mb-5 items-center'>
                      <PaginationNotUrl pageSize={data?.data.result.totalPage} query={query} setQuery={setQuery} />
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Xem trước</h2>

            <div className='relative'>
              <div className='w-full mx-auto'>
                <div className=' bg-white dark:bg-color-primary rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal'>
                  <div className='bg-white dark:bg-color-primary relative px-5'>
                    {!imageWatch || imageWatch.length === 0 ? (
                      <div className=''>Link ảnh bài viết</div>
                    ) : (
                      <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                        <img
                          className='object-cover max-h-[15rem] md:max-h-[26rem] rounded-md w-[100%]'
                          src={URL.createObjectURL(imageWatch[0])}
                          alt=''
                        />
                      </div>
                    )}
                    <header className='not-format'>
                      <div>
                        <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                          {titleWatch === '' ? 'Tiêu đề bài viết' : titleWatch}
                        </h1>
                      </div>
                    </header>
                    <p className='lead mb-3 whitespace-pre-line font-medium'>
                      {descriptionWatch === '' ? 'Mô tả bài viết' : descriptionWatch}
                    </p>

                    <div className='custorm-blog '>
                      {content === '' ? <div>Nội dung bài viết</div> : <div>{parse(content)}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const IngredientItem = ({ ingredient, mealState, setMealState }) => {
  const onSubmit = () => {
    // nếu đã tồn tại thì không thêm vào
    const isExisted = mealState.find((i) => i.id === ingredient._id)

    if (isExisted) {
      toast.error('Món ăn đã tồn tại')
      return
    }

    const dataWithId = {
      id: ingredient._id,
      meal_name: ingredient.name,
      energy: parseFloat(ingredient.energy.toFixed(1)),
      protein: parseFloat(ingredient.protein.toFixed(1)),
      fat: parseFloat(ingredient.fat.toFixed(1)),
      carbohydrate: parseFloat(ingredient.carbohydrate.toFixed(1))
    }

    setMealState((prev) => [...prev, dataWithId])
  }
  return (
    <tr>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{ingredient.name}</span>
      </td>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{ingredient.energy} cal</span>
      </td>
      <td className='px-6 py-4 '>
        <button
          onClick={onSubmit}
          className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <FaPlus />
          </div>
        </button>
      </td>
    </tr>
  )
}
