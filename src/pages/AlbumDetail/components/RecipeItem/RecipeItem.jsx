import moment from 'moment'
import { Link } from 'react-router-dom'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { cutString } from '../../../../utils/helper'

export default function RecipeItem({ recipe }) {
  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex gap-2 items-center'>
            <div className='inline-block'>
              <img
                className='rounded-full object-cover max-w-none w-8 h-8'
                src={recipe.user.avatar === '' ? useravatar : recipe.user.avatar}
              />
            </div>
            <div>
              <div className='text-sm text-gray-700 dark:text-gray-300'>{recipe.user.name}</div>
              <div className='text-xs text-gray-500'>@{recipe.user.user_name}</div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{cutString(recipe.title, 20)}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          {recipe.status === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-black dark:bg-pink-200'>
              Chưa duyệt
            </span>
          ) : recipe.status === 1 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
              Đã duyệt
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-black'>
              Bị từ chối
            </span>
          )}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{recipe.category_recipe.name}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(recipe.createdAt).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 mt-2 gap-2 flex item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/albums/recipes/${recipe._id}`} className='text-green-500 cursor-pointer hover:text-green-800'>
            Xem
          </Link>
        </td>
      </tr>
    </>
  )
}
