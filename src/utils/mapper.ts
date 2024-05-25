import { instanceToPlain, plainToClass } from "class-transformer";

export class Mapper {

    static mapFromTo<From, To>(fromParam: From, toClass: new () => To): To {
        const plainObj = instanceToPlain<From>(fromParam);

        return plainToClass(toClass, plainObj, { excludeExtraneousValues: true });
    }

}

