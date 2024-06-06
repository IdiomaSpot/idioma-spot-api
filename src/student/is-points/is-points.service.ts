import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadSheetService } from '../../google-spread-sheet/google-spread-sheet.service';
import { IsPointsDTO } from './dtos/is-points.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class IsPointsService {
  IS_POINTS_GOOGLE_SPREADSHEET = 'PUNTOS-POR-ALUMNO';
  constructor(
    private gssService: GoogleSpreadSheetService,
    private envConfig: ConfigService,
  ) {}

  async getIsPoints(email: string): Promise<IsPointsDTO> {
    let response: IsPointsDTO;
    const gssResponse = await this.gssService.getValuesFromSpreadSheet({
      id: this.envConfig.get<string>('gss_id'),
      range: this.IS_POINTS_GOOGLE_SPREADSHEET,
    });

    //Now we need to remove out the titles that come up within data
    //in order to provide just the raw data
    const rawData = gssResponse.data.values.slice(
      1,
      gssResponse.data.values.length,
    );

    for (const points of rawData) {
      if (points[0] === email) {
        const isPoints = new IsPointsDTO();
        isPoints.email = points[0] || null;
        isPoints.points = points[1] || null;
        response = isPoints;
      }
    }

    if (!response || !response?.email) {
      throw new HttpException(`User ${email} not found`, HttpStatus.NOT_FOUND);
    }

    return response;
  }
}
