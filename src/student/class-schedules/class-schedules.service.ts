import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadSheetService } from '../../shared/google-spread-sheet/google-spread-sheet.service';
import { ClassScheduleDTO } from './dtos/class-schedule.dto';
import { evalBool } from '../../utils/eval';
import { isNotValidDate, parseStringToDate } from '../../utils/handlerDates';

@Injectable()
export class ClassSchedulesService {
  constructor(
    private gssService: GoogleSpreadSheetService,
    private envConfig: ConfigService,
  ) {}

  private async getAllClassesSchedules(
    range: string,
    options?: { includeLink?: boolean; excludeCost?: boolean },
  ): Promise<ClassScheduleDTO[]> {
    const response: ClassScheduleDTO[] = [];
    const gssResponse = await this.gssService.getValuesFromSpreadSheet({
      id: this.envConfig.get<string>('gss_id'),
      range: range,
    });

    //Now we need to remove out the titles that come up within data
    //in order to provide just the raw data
    const rawData = gssResponse.data.values.slice(
      1,
      gssResponse.data.values.length,
    );
    for (const schedule of rawData) {
      const classSchedule = new ClassScheduleDTO();
      classSchedule.id = schedule[0] || null;
      classSchedule.schedule = schedule[1] || null;
      classSchedule.isAlmostFull = evalBool(schedule[5]) || false;
      classSchedule.isFull = evalBool(schedule[6]) || false;
      classSchedule.startDate = schedule[8] || null;
      classSchedule.classLevel = schedule[9] || null;
      classSchedule.hoursDuration = schedule[10] || null;

      //Configrable fields
      classSchedule.cost = options?.excludeCost
        ? undefined
        : schedule[11] || null;
      classSchedule.link = options?.includeLink
        ? schedule[7] || undefined
        : undefined;
      response.push(classSchedule);
    }

    return response;
  }

  async getClassesSchedules(range: string): Promise<ClassScheduleDTO[]> {
    const allClasses = await this.getAllClassesSchedules(range);

    let validClasses: ClassScheduleDTO[] = [];
    for (const schedule of allClasses) {
      if (
        !schedule?.startDate ||
        isNotValidDate(parseStringToDate(schedule.startDate.toString()))
      ) {
        continue;
      }
      validClasses.push(schedule);
    }

    return validClasses;
  }

  async getClassScheduleById(
    range: string,
    classScheduleId: string,
  ): Promise<ClassScheduleDTO> {
    try {
      const allClasses = await this.getAllClassesSchedules(range, {
        includeLink: true,
        excludeCost: true,
      });

      const classSchedule = allClasses.find(
        (classSchedule) => classSchedule.id == classScheduleId,
      );

      if (classSchedule) {
        return classSchedule;
      } else {
        throw new HttpException(
          'Class Schedule Not Found',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
