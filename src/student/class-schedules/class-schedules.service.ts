import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadSheetService } from '../../google-spread-sheet/google-spread-sheet.service';
import { ClassScheduleDTO } from './dtos/class-schedule.dto'
import { evalBool } from '../../utils/eval';

@Injectable()
export class ClassSchedulesService {
    constructor(private gssService: GoogleSpreadSheetService, private envConfig: ConfigService) { }

    async getClassesSchedules(range: string): Promise<ClassScheduleDTO[]> {
        let response: ClassScheduleDTO[] = [];
        const gssResponse = await this.gssService.getValuesFromSpreadSheet(
            {
                id: this.envConfig.get<string>('gss_id'),
                range: range,
            }
        );

        //Now we need to remove out the titles that come up within data
        //in order to provide just the raw data
        const rawData = gssResponse.data.values.slice(1, gssResponse.data.values.length);

        for (const schedule of rawData) {
            let classSchedule = new ClassScheduleDTO();
            classSchedule.id = schedule[0] || null;
            classSchedule.schedule = schedule[1] || null;
            classSchedule.isAlmostFull = evalBool(schedule[5]) || false;
            classSchedule.isFull = evalBool(schedule[6]) || false;
            response.push(classSchedule);
        }

        return response;
    }
}
