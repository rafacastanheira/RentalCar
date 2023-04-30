import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRouters = Router()

const createSpecificationController = new CreateSpecificationController();

specificationsRouters.post('/', createSpecificationController.handle)

export {specificationsRouters}
