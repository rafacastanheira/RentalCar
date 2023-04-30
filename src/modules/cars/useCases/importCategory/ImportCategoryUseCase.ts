import {parse} from 'csv-parse'
import fs from 'fs'
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import {inject, injectable} from 'tsyringe'

interface IImportCategory{
    name: string
    description: string
}

@injectable()
class ImportCategoryUseCase{
    constructor(
        @inject('CaregoriesRepository')
        private categoriesRepository: CategoriesRepository
    ) { }
    
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const categories : IImportCategory[] = []

            const parsefile = parse()

            stream.pipe(parsefile)

            parsefile.on('data', async (line) => {
                const [name, description] = await line
                categories.push({
                    name,
                    description
                })
            }).on('end', () => {
                fs.promises.unlink(file.path)
                resolve(categories)
            }).on('error', (err) => {
                reject(err)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file)

        categories.map(async(category) => {
            const { name, description } = category
            
            const existCategory = await this.categoriesRepository.findByName(name)

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }
}

export {ImportCategoryUseCase}
