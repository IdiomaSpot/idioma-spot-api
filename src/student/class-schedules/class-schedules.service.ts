import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadSheetService } from 'src/google-spread-sheet/google-spread-sheet.service';

@Injectable()
export class ClassSchedulesService {
    constructor(private gssService: GoogleSpreadSheetService, private envConfig: ConfigService) { }

    async getClassesSchedules(range: string) {
        const gssResponse = await this.gssService.getValuesFromSpreadSheet(
            {
                id: this.envConfig.get<string>('gss_id'),
                range: range,
            }
        );

        //Now we need to remove out the titles that come up within data
        //in order to provide just the data
        const response = gssResponse.data.values.slice(1, gssResponse.data.values.length);

        return response;
    }
}
