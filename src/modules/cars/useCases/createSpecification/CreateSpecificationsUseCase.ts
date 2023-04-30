import { ISpecificationsRepository } from "../../repositories/ISpecifacationsRepository";
import {inject, injectable} from 'tsyringe'

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CreateSpecificationsUseCase{
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository) {
    }

    async execute({ name, description }: IRequest):Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new Error('This specifications already exists!')
        }

        await this.specificationsRepository.create({name, description})
    }
}

export {CreateSpecificationsUseCase}
