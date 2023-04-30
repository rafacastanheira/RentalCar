import { Router } from 'express'
import { categoriesRoutes } from './categories.routes'
import { specificationsRouters } from './specifications.routes'
import { usersRouters } from './users.routes'

const router = Router()


router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRouters)
router.use('/users', usersRouters)

export {router}
