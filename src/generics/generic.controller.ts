import { Post, Body, Get, Query, Param, Put, Delete, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { FindManyOptions } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { GenericService } from "./generic.service";

export abstract class GenericController<Entity extends GenericEntity, Service extends GenericService<Entity>> {

    constructor(private readonly service: Service) { }

    @Post()
    @ApiBearerAuth()
    async create(@Body() entity: Entity) {
        return this.service.create(entity);
    }

    @Get()
    @ApiBearerAuth()
    async find(@Query() options?: FindManyOptions<Entity>) {
        return this.service.find({ ...options });
    }

    @Get(":id")
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    async findOne(@Param('id') id: number) {
        return this.service.findOneById(id);
    }

    @Put(":id")
    @Patch(":id")
    @ApiBearerAuth()
    async update(@Param('id') id: number, @Body() entity: Entity) {
        if (id != entity.id)
            return;
        return this.service.update(entity);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    async delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}