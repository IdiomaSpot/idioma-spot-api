import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { IsPointsDTO } from './dtos/is-points.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPointsService } from './is-points.service';

@ApiTags('IS Points')
@Controller('is-points')
export class IsPointsController {
  constructor(private readonly isPointsService: IsPointsService) {}

  @Get(':email')
  @ApiBearerAuth()
  @ApiParam({ name: 'email', type: 'string' })
  @ApiResponse({ type: IsPointsDTO, isArray: false, status: HttpStatus.OK })
  async getIsPoints(@Param('email') email: string): Promise<IsPointsDTO> {
    return await this.isPointsService.getIsPoints(email);
  }
}
