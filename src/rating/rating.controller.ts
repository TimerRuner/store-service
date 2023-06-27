import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {CreateRatingDto} from "./dto/create-rating.dto";
import {RatingService} from "./rating.service";
import {Roles} from "../auth/role.decorator";
import {ERole} from "../user/dto/user-create.dto";
import {RoleGuard} from "../auth/role.guard";
import {UpdateRatingDto} from "./dto/update-rating.dto";

@Controller('rating')
export class RatingController {

    constructor(private readonly ratingService: RatingService) {}

    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Post("create")
    async createRating(@Req() req, @Body() dto: CreateRatingDto) {
        const {user} = req
        return await this.ratingService.createRating({...dto, userId: user.id})
    }

    @Get("get/:id")
    async getOneRate(@Param("id") id: number) {
        return await this.ratingService.getOneRate(id)
    }

    @Patch("update/:id")
    async updateRate(@Body() dto: UpdateRatingDto, @Param("id") id: number) {
        return await this.ratingService.updateRate(dto.rate, id)
    }

    @Delete("delete/:id")
    async deleteRate(@Param("id") id: number) {
        return await this.ratingService.deleteRate(id)
    }
}
