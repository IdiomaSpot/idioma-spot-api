import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentClassDTO } from './dtos/student-class.dto';
import { GenericController } from '../../generics/generic.controller';
import { StudentClass } from './entities/student-class.entity';
import { ClassesService } from './classes.service';
import { StudentClassResponseDTO } from './dtos/student-class-response.dto';

@Controller('student/classes')
@ApiTags('Student Classes')
export class ClassesController extends GenericController<
  StudentClass,
  ClassesService
> {
  constructor(private readonly classesService: ClassesService) {
    super(classesService);
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
