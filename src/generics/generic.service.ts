import { Mapper } from "src/utils/mapper";
import { GenericEntity } from "./generic.entity";
import { DeleteResult, InsertResult, FindManyOptions, DeepPartial, Repository, FindOneOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";


export abstract class GenericService<Entity extends GenericEntity, ReturnType = Entity> {

    constructor(private readonly repository: Repository<Entity>) { }

    async create<RespType = ReturnType>(entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[] | Entity): Promise<RespType> {
        try {
            let response: RespType;
            const result = await this.repository.insert(entity as QueryDeepPartialEntity<Entity>);

            response = await this.findOneById<RespType>(result.raw.id);
            return Promise.resolve(response);
        } catch (error) {
            throw error;
        }
    }

    async find<RespType = ReturnType>(options?: FindManyOptions<Entity>): Promise<RespType[]> {
        const entities: Entity[] = await this.repository.find(options);

        let toClass: new () => RespType[];
        const response: RespType[] = Mapper.mapFromTo(entities, toClass);
        return Promise.resolve(response);
    }

    async findOne<RespType = Entity>(options?: FindOneOptions<Entity>): Promise<RespType> {
        const entity: Entity = await this.repository.findOne(options);

        let toClass: new () => RespType;
        const response: RespType = Mapper.mapFromTo(entity, toClass);

        return Promise.resolve(response);
    }

    async findOneById<RespType = Entity>(id: any): Promise<RespType> {
        const entity: Entity = await this.repository.findOne({ where: { id } });

        let toClass: new () => RespType;
        const response: RespType = Mapper.mapFromTo(entity, toClass);

        return Promise.resolve(response);
    }

    async update<RespType = Entity>(entity: DeepPartial<Entity>): Promise<DeepPartial<RespType>> {
        const entityObj: Entity = await this.repository.save(entity);

        let toClass: new () => RespType;
        const response: RespType = Mapper.mapFromTo(entityObj, toClass);
        return Promise.resolve(response);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.softDelete(id);
    }
}