import { GenericEntity } from "./generic.entity";
import { DeleteResult, InsertResult, FindManyOptions, DeepPartial, Repository, FindOneOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";


export abstract class GenericService<Entity extends GenericEntity>{

    constructor(private readonly repository: Repository<Entity>) { }

    create(entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[] | Entity): Promise<InsertResult> {
        return this.repository.insert(entity as QueryDeepPartialEntity<Entity>);
    }

    find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
        return this.repository.find(options);
    }

    findOne(options?: FindOneOptions<Entity>): Promise<Entity> {
        return this.repository.findOne(options);
    }

    findOneById(id): Promise<Entity> {
        return this.repository.findOne({ where: { id } });
    }

    update(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity>> {
        return this.repository.save(entity);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.softDelete(id);
    }

}