import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentClassDTO } from './dtos/student-class.dto';
import { GenericController } from '../../generics/generic.controller';
import { StudentClass } from './entities/student-class.entity';
import { ClassesService } from './classes.service';
import { StudentClassResponseDTO } from './dtos/student-class-response.dto';
import { ValidateClassParamsDTO } from './dtos/validate-class-params.dto';
import { StudentEnrolledDTO } from './dtos/student-enrolled-response.dto';

@Controller('student/classes')
@ApiTags('Student Classes')
export class ClassesController extends GenericController<
  StudentClass,
  ClassesService
> {
  constructor(private readonly classesService: ClassesService) {
    super(classesService);
  }

  @Get('validate')
  @ApiBearerAuth()
  @ApiQuery({ name: 'studentId', type: Number })
  @ApiQuery({
    name: 'classType',
    description: 'Possible Values: ONLIVE, TEENS, KIDS, JUSTSPEAK',
    type: String,
  })
  @ApiQuery({ name: 'classScheduleId', type: String })
  @ApiResponse({ type: StudentEnrolledDTO, status: HttpStatus.OK })
  async validateClass(
    @Query() queryParams: ValidateClassParamsDTO,
  ): Promise<StudentEnrolledDTO> {
    return await this.classesService.isStudentAlreadyEnrolled(queryParams);
  }

  @Get(':studentId')
  @ApiBearerAuth()
  @ApiResponse({
    type: StudentClassResponseDTO,
    isArray: true,
    status: HttpStatus.OK,
  })
  getStudentClasses(@Param('studentId') studentId: number) {
    return this.classesService.getClassesByStudent(studentId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: StudentClassDTO })
  @ApiResponse({ type: StudentClass, isArray: false, status: HttpStatus.OK })
  async create<StudentClass>(
    @Body() studentClassDTO: StudentClassDTO,
  ): Promise<StudentClass> {
    return await this.classesService.create<StudentClass>(studentClassDTO);
  }
}
