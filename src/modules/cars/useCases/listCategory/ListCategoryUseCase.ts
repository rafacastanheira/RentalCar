import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import {inject, injectable} from 'tsyringe'

@injectable()
class ListCategoriesUseCase{
    constructor(
        @inject('CaregoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }
    
    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list()

        return categories
    }
}

export {ListCategoriesUseCase}
