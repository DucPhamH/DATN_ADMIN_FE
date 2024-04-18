import * as yup from 'yup'

export const schemaLoginAdmin = yup.object({
  user_name: yup
    .string()
    .required('Tên tài khoản là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
})

export const schemaCreateBlog = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  image: yup.string().required('Link ảnh là bắt buộc').url('Link ảnh không đúng định dạng'),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự'),
  // nếu category_blog_id = DEFAULT thì sẽ báo lỗi
  category_blog_id: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại blog'),
  content: yup.string().required('Nội dung là bắt buộc').min(10, 'Độ dài từ 100 ký tự')
})

//validate dynamic form
