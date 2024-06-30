import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GenericController } from '../generics/generic.controller';
import { PromoService } from './promo.service';
import { Promo } from './entities/promo.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PromoRequestDTO } from './dtos/promo-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PromoResponseDTO } from './dtos/promo-response.dto';
import { FindManyOptions, IsNull, Not } from 'typeorm';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../user/user-role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('promo')
@ApiTags('Promos')
export class PromoController extends GenericController<Promo, PromoService> {
  constructor(private readonly promoService: PromoService) {
    super(promoService);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PromoRequestDTO, required: true })
  @ApiResponse({ type: PromoResponseDTO, status: HttpStatus.OK })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createPromo(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: PromoRequestDTO,
  ): Promise<PromoResponseDTO> {
    const boolValue =
      typeof body.enableSignUpButton === 'string'
        ? body.enableSignUpButton === 'true'
        : body.enableSignUpButton;
    body.enableSignUpButton = boolValue;

    const promo = await this.promoService.createPromo(image, body);

    let response = new PromoResponseDTO();
    response.title = promo.title;
    response.description = promo.description;
    response.enableSignUpButton = promo.enableSignUpButton;
    response.image = 'successfuly saved';
    response.mimetype = promo.mimetype;
    return response;
  }

  @Get()
  @ApiBearerAuth()
  async find<ReturnType = PromoResponseDTO>(
    options?: FindManyOptions<Promo>,
  ): Promise<ReturnType[]> {
    const currentPromo = await this.promoService.findOne<Promo>({
      order: { id: 'DESC' },
      where: { id: Not(IsNull()) },
      withDeleted: true,
    });

    if (currentPromo.deletedAt != null) {
      return [];
    }

    let item = new PromoResponseDTO();
    item.id = currentPromo.id;
    item.title = currentPromo.title;
    item.description = currentPromo.description;
    item.enableSignUpButton = currentPromo.enableSignUpButton;
    item.mimetype = currentPromo.mimetype;
    item.image = `data:${item.mimetype};base64,${currentPromo.image.toString('base64')}`;

    const response = [item];

    return response as ReturnType[];
  }
}
