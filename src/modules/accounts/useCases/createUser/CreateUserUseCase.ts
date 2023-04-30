import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { hash } from "bcrypt"

@injectable()
class CreateUserUseCase{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        
        const userAlreadyExist = await this.usersRepository.findByEmail(email)

        if (userAlreadyExist) {
            throw new Error("User already exists")
        }
        
        const passwordHash = await hash(password, 8)
        
        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash
        })
    }
}

export {CreateUserUseCase}