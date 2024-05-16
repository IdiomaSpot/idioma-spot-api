import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { ClassSchedulesController } from './class-schedules/class-schedules.controller';
import { GoogleSpreadSheetModule } from 'src/google-spread-sheet/google-spread-sheet.module';
import configuration from 'src/config/configuration';
import { ClassSchedulesService } from './class-schedules/class-schedules.service';

@Module({
    imports: [
        GoogleSpreadSheetModule.register(configuration().gspConfig),
    ],
    controllers: [StudentController, ClassSchedulesController],
    providers: [
        ClassSchedulesService
    ]
})
export class StudentModule { }
