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

export const schemaRegisterUser = yup.object({
  name: yup.string().required('Tên là bắt buộc').min(3, 'Độ dài từ 5 - 160 ký tự').max(160, 'Độ dài từ 5 - 160 ký tự'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 3 - 160 ký tự')
    .max(160, 'Độ dài từ 3 - 160 ký tự'),
  user_name: yup
    .string()
    .required('Tên tài khoản là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự')
})

export const schemaCreateIngredient = yup.object({
  name: yup.string().required('Tên là bắt buộc').min(1, 'Độ dài từ 1 - 160 ký tự').max(160, 'Độ dài từ 3 - 160 ký tự'),
  energy: yup.number().required('Năng lượng là bắt buộc').min(0, 'Năng lượng không được âm'),
  protein: yup.number().required('Protein là bắt buộc').min(0, 'Protein không được âm'),
  fat: yup.number().required('Fat là bắt buộc').min(0, 'Fat không được âm'),
  carbohydrate: yup.number().required('Carbohydrate là bắt buộc').min(0, 'Carbohydrate không được âm'),
  ingredient_category_ID: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn loại nguyên liệu')
})

export const schemaCreateRecipe = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  // image là dạng file , bắt buộc và có định dạng jpg
  image: yup
    .mixed()
    .required('Ảnh là bắt buộc')
    .test('fileType', 'Ảnh phải có định dạng jpg', (value) => {
      if (value) {
        return value && value[0]?.type === 'image/jpeg'
      }
      return false
    }),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự'),
  // nếu category_recipe_id = DEFAULT thì sẽ báo lỗi
  category_recipe_id: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại món ăn'),
  content: yup.string().required('Nội dung là bắt buộc').min(10, 'Độ dài từ 100 ký tự'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0'),
  difficult_level: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 mức độ khó'),
  region: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 khu vực'),
  processing_food: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 loại thực phẩm'),

  // video là url không bắt buộc phải có định dạng
  video: yup.string().url('Link video không đúng định dạng'),
  energy: yup.number().required('Năng lượng là bắt buộc').min(0, 'Năng lượng không được âm'),
  protein: yup.number().required('Protein là bắt buộc').min(0, 'Protein không được âm'),
  fat: yup.number().required('Fat là bắt buộc').min(0, 'Fat không được âm'),
  carbohydrate: yup.number().required('Carbohydrate là bắt buộc').min(0, 'Carbohydrate không được âm'),
  unit: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn đơn vị'),
  quantity: yup.number().required('Số lượng là bắt buộc').min(0, 'Số lượng không được âm')
})

export const schemaUpdateRecipe = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự'),
  // nếu category_recipe_id = DEFAULT thì sẽ báo lỗi
  category_recipe_id: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại món ăn'),
  content: yup.string().required('Nội dung là bắt buộc').min(10, 'Độ dài từ 100 ký tự'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0'),
  difficult_level: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 mức độ khó'),
  region: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 khu vực'),
  processing_food: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 loại thực phẩm'),

  // video là url không bắt buộc phải có định dạng
  video: yup.string().url('Link video không đúng định dạng'),
  energy: yup.number().required('Năng lượng là bắt buộc').min(0, 'Năng lượng không được âm'),
  protein: yup.number().required('Protein là bắt buộc').min(0, 'Protein không được âm'),
  fat: yup.number().required('Fat là bắt buộc').min(0, 'Fat không được âm'),
  carbohydrate: yup.number().required('Carbohydrate là bắt buộc').min(0, 'Carbohydrate không được âm'),
  unit: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn đơn vị'),
  quantity: yup.number().required('Số lượng là bắt buộc').min(0, 'Số lượng không được âm')
})
//validate dynamic form
