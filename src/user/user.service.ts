import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ERole, UserCreateDto} from "./dto/user-create.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {RoleService} from "../role/role.service";
import {Role} from "../role/role.model";
import {BasketService} from "../basket/basket.service";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly roleService: RoleService,
        private readonly basketService: BasketService
    ) {}
    async create(dto: UserCreateDto) {
        let role
        try {
            role = await this.roleService.getRole(dto.role)
        } catch (e) {
            role = await this.roleService.getRole(ERole.USER)
        }
        if(dto.role) {
           delete dto.role
        }
        const user = await this.userRepository.create(dto)

        await this.basketService.createBasket(user.id)

        user.roleId = role.id
        await user.save()

        return await this.userRepository.findOne({where: {email: user.email}, include: [Role]})
    }

    async getUserByEmail(email: string){
        return await this.userRepository.findOne({where: {email}, include: [Role]})
    }

    async getUserById(id: number){
        const user = await this.userRepository.findOne({where: {id}, include: [Role]})
        if(!user) {
            throw new NotFoundException(`User with id - ${id} doesn't exist`)
        }
        return user
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        if(dto?.email) {
            delete dto.email
        }
        const [rowsAffected, [updatedRecords]] = await this.userRepository.update(dto, {where: {id}, returning: true})
        if(!rowsAffected) {
            throw new NotFoundException(`User with id ${id} does not exist`)
        }
        return updatedRecords
    }

    async delete(id: number) {
        if(!id) {
            throw new BadRequestException(`Id doesn't exist`)
        }
        await this.userRepository.destroy({where: {id}})
        await this.basketService.deleteBasket(id)
        return `User with id ${id} was removed successfully`
    }

}
