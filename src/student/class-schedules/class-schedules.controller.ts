import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassSchedulesService } from './class-schedules.service';
import { ClassType, classMapping } from './class-schedules-types';
import { ClassScheduleDTO } from './dtos/class-schedule.dto';

@ApiTags("Class Schedules")
@Controller('class-schedules')
export class ClassSchedulesController {

    constructor(private readonly classSchedulesService: ClassSchedulesService) { }

    @Get(':studyProgramName')
    @ApiBearerAuth()
    @ApiParam({ name: 'studyProgramName', enum: ClassType })
    @ApiResponse({ type: ClassScheduleDTO, isArray: true, status: HttpStatus.OK })
    async getClassesSchedules(@Param('studyProgramName') studyProgramName: ClassType): Promise<ClassScheduleDTO[]> {
        const targetClass = classMapping[studyProgramName]; //We are getting the target sheet name of GoogleSpreadSheet file

        return await this.classSchedulesService.getClassesSchedules(targetClass);
    }
}
