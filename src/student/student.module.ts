import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { ClassSchedulesController } from './class-schedules/class-schedules.controller';
import { IsPointsController } from './is-points/is-points.controller';
import { IsPointsService } from './is-points/is-points.service';
import { GoogleSpreadSheetModule } from '../shared/google-spread-sheet/google-spread-sheet.module';
import configuration from '../config/configuration';
import { ClassSchedulesService } from './class-schedules/class-schedules.service';
import { ClassesController } from './classes/classes.controller';
import { ClassesService } from './classes/classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { User } from '../user/entities/user.entity';
import { StudentClass } from './classes/entities/student-class.entity';

@Module({
  imports: [
    GoogleSpreadSheetModule.register(configuration().gspConfig),
    TypeOrmModule.forFeature([StudentClass, Payment, User]),
  ],
  controllers: [
    StudentController,
    ClassSchedulesController,
    IsPointsController,
    ClassesController,
  ],
  providers: [
    ClassSchedulesService,
    IsPointsService,
    ClassesService,
  ],
})
export class StudentModule {}
