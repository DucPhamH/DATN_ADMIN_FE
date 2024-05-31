import moment from 'moment'
import { Link } from 'react-router-dom'
import { cutString } from '../../../../utils/helper'
import { useState } from 'react'
import { deleteRecipe } from '../../../../apis/writterApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import { toast } from 'react-hot-toast'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'

export default function RecipeItem({ recipe }) {
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(recipe._id)
  })
  // const acceptRecipesMutation = useMutation({
  //   mutationFn: () => acceptRecipe(recipe._id)
  // })

  const handleDelete = () => {
    deleteRecipeMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['recipes-writter-list']
        })
        toast.success('Xóa bài viết thành công')
      }
    })
  }
  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{cutString(recipe.title, 20)}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{recipe.time} phút</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{recipe.processing_food}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{recipe.category_recipe.name}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(recipe.createdAt).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4  gap-2 flex item-center whitespace-nowrap  text-sm font-medium'>
          <Link
            to={`/recipes-writter/edit/${recipe._id}`}
            className='text-green-500 cursor-pointer hover:text-green-800'
          >
            Sửa
          </Link>

          <div onClick={handleOpenDelete} className=' cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>

          <span>
            {openDelete && (
              <ConfirmBox
                closeModal={handleCloseDelete}
                handleDelete={handleDelete}
                isPending={deleteRecipeMutation.isPending}
                title={'Xác nhận xóa'}
                subtitle={'Bạn có chắc chắn muốn xóa bài viết này'}
                tilteButton={'Xóa bài viết'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
