// import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'

import { useState } from 'react'
import { deleteIngredient } from '../../../../apis/writterApi'
import { queryClient } from '../../../../main'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import ConfirmBox from '../../../../components/GlobalComponents/ConfirmBox'

export default function IngerdientItem({ ingredient }) {
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const deleteIngredientMutation = useMutation({
    mutationFn: () => deleteIngredient(ingredient._id)
  })

  const handleDelete = () => {
    deleteIngredientMutation.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['list-ingredients']
        })
        toast.success('Xóa nguyên liệu thành công')
      }
    })
  }

  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-700 dark:text-gray-300'>{ingredient.name}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.energy} calories</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.protein} g</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.fat} g</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.carbohydrate} g</div>
        </td>

        <td className='px-6 py-4  gap-2 flex item-center whitespace-nowrap  text-sm font-medium'>
          <div onClick={handleOpenDelete} className=' cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>

          <span>
            {openDelete && (
              <ConfirmBox
                closeModal={handleCloseDelete}
                handleDelete={handleDelete}
                isPending={deleteIngredientMutation.isPending}
                title={'Xác nhận xóa'}
                subtitle={'Bạn có chắc chắn muốn xóa nguyên liệu này'}
                tilteButton={'Xóa nguyên liệu'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
