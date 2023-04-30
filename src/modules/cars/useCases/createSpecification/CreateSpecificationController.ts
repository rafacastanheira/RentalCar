import {Request, Response} from 'express'
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase"
import {container} from 'tsyringe'

class CreateSpecificationController{
    async handle(request: Request, response: Response): Promise<Response> {

        const { name, description } = request.body
        
        const specificationsService = container.resolve(CreateSpecificationsUseCase)

        await specificationsService.execute({ name, description })
        
        return response.status(201).send()
    }
}

export {CreateSpecificationController}
