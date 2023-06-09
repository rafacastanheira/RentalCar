import { Router } from 'express'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ListCategoriesController } from '../modules/cars/useCases/listCategory/ListCategoriesController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'

const categoriesRoutes = Router()

import multer from 'multer'

const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export {categoriesRoutes }
