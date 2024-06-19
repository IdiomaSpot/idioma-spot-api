import { Post, Body, Get, Query, Param, Put, Delete, Patch, HttpException, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { FindManyOptions } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { GenericService } from "./generic.service";

export abstract class GenericController<Entity extends GenericEntity, Service extends GenericService<Entity, ResponseType>, ResponseType = Entity> {

    constructor(private readonly service: Service) { }

    @Post()
    @ApiBearerAuth()
    async create<ReturnType = ResponseType>(@Body() entity: Entity): Promise<ReturnType> {
        return this.service.create<ReturnType>(entity);
    }

    @Get()
    @ApiBearerAuth()
    async find<ReturnType = ResponseType>(@Query() options?: FindManyOptions<Entity>): Promise<ReturnType[]> {
        return this.service.find<ReturnType>({ ...options });
    }

    @Get(":id")
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    async findOne<ReturnType = ResponseType>(@Param('id') id: number) {
        return this.service.findOneById<ReturnType>(id);
    }

    @Put(":id")
    @Patch(":id")
    @ApiBearerAuth()
    async update<ReturnType = ResponseType>(@Param('id') id: number, @Body() entity: Entity) {
        if (id != entity.id)
            return;
        return this.service.update<ReturnType>(entity);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    async delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}