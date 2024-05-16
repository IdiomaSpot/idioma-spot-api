import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClassSchedulesService } from './class-schedules.service';
import { ClassType, classMapping } from './class-schedules-types';

@ApiTags("Class Schedules")
@Controller('class-schedules')
export class ClassSchedulesController {

    constructor(private readonly classSchedulesService: ClassSchedulesService) { }

    @Get(':studyProgramName')
    @ApiBearerAuth()
    @ApiParam({ name: 'studyProgramName', enum: ClassType })
    async getClassesSchedules(@Param('studyProgramName') studyProgramName: ClassType) {
        const targetClass = classMapping[studyProgramName]; //We are getting the target sheet name of GoogleSpreadSheet file

        return await this.classSchedulesService.getClassesSchedules(targetClass);
    }
}
