import { Injectable } from '@nestjs/common';
import { GenericService } from '../../generics/generic.service';
import { StudentClass } from './entities/student-class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentClassDTO } from './dtos/student-class.dto';
import { User } from '../../user/entities/user.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Mapper } from '../../utils/mapper';
import { StudentClassResponseDTO } from './dtos/student-class-response.dto';
import { ClassSchedulesService } from '../class-schedules/class-schedules.service';
import { classMapping } from '../class-schedules/class-schedules-types';

@Injectable()
export class ClassesService extends GenericService<StudentClass> {
  constructor(
    @InjectRepository(StudentClass)
    private readonly classesServiceRepository: Repository<StudentClass>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly classSchedulesService: ClassSchedulesService,
  ) {
    super(classesServiceRepository);
  }

  async getClassesByStudent(
    studentId: number,
  ): Promise<StudentClassResponseDTO[]> {
    try {
      const classes = await this.userRepository.findOne({
        where: { id: studentId },
        relations: {
          classes: true,
        },
      });

      let toClass: new () => StudentClassResponseDTO[];
      const resp = Mapper.mapFromTo(classes.classes, toClass);

      const promises = resp.map((klass) => {
        const targetClass = classMapping[klass.classType]; //We are getting the target sheet name of GoogleSpreadSheet file

        return this.classSchedulesService.getClassScheduleById(
          targetClass,
          klass.classScheduleId,
        );
      });

      //Promises execution
      await (async () => {
        try {
          const results = await Promise.all(promises);

          results.forEach((value, index) => {
            resp[index].schedule = value.schedule;
            resp[index].link = value.link;
            resp[index].startDate = value.startDate;
            resp[index].classLevel = value.classLevel;
            resp[index].hoursDuration = value.hoursDuration;
          });
        } catch (error) {
          throw error;
        }
      })();

      return resp;
    } catch (e) {
      throw e;
    }
  }

  async create<StudentClass>(studentClassDTO: StudentClassDTO) {
    try {
      const user = await this.userRepository.findOneBy({
        id: studentClassDTO.studentId,
      });
      const payment = await this.paymentRepository.findOneBy({
        id: studentClassDTO.paymentId,
      });
      let entity = new StudentClass();
      entity = Mapper.mapFromTo(studentClassDTO, StudentClass);
      entity.payment = payment;
      entity.student = user;

      return await super.create<StudentClass>(entity);
    } catch {
      throw new Error('ERROR CREATING STUDENT CLASS');
    }
  }
}
