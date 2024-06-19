import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { ClassSchedulesController } from './class-schedules/class-schedules.controller';
import { IsPointsController } from './is-points/is-points.controller';
import { IsPointsService } from './is-points/is-points.service';
import { GoogleSpreadSheetModule } from 'src/google-spread-sheet/google-spread-sheet.module';
import configuration from 'src/config/configuration';
import { ClassSchedulesService } from './class-schedules/class-schedules.service';

@Module({
  imports: [GoogleSpreadSheetModule.register(configuration().gspConfig)],
  controllers: [
    StudentController,
    ClassSchedulesController,
    IsPointsController,
  ],
  providers: [ClassSchedulesService, IsPointsService],
})
export class StudentModule {}
