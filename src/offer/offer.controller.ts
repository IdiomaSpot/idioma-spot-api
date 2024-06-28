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
import { OfferService } from './offer.service';
import { Offer } from './entities/offer.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OfferRequestDTO } from './dtos/offer-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { OfferResponseDTO } from './dtos/offer-response.dto';
import { FindManyOptions } from 'typeorm';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../user/user-role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('offer')
@ApiTags('Offers')
export class OfferController extends GenericController<Offer, OfferService> {
  constructor(private readonly offerService: OfferService) {
    super(offerService);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: OfferRequestDTO, required: true })
  @ApiResponse({ type: OfferResponseDTO, status: HttpStatus.OK })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createOffer(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: OfferRequestDTO,
  ): Promise<OfferResponseDTO> {
    const offer = await this.offerService.createOffer(image, body);

    let response = new OfferResponseDTO();
    response.title = offer.title;
    response.description = offer.description;
    response.enableSignUpButton = offer.enableSignUpButton;
    response.image = 'successfuly saved';
    response.mimetype = offer.mimetype;
    return response;
  }

  @Get()
  @ApiBearerAuth()
  async find<ReturnType = OfferResponseDTO>(
    options?: FindManyOptions<Offer>,
  ): Promise<ReturnType[]> {
    const currentOffer = await this.offerService.findOne<Offer>({
      order: { id: 'DESC' },
      where: { deletedAt: null },
    });

    let item = new OfferResponseDTO();
    item.id = currentOffer.id;
    item.title = currentOffer.title;
    item.description = currentOffer.description;
    item.enableSignUpButton = currentOffer.enableSignUpButton;
    item.mimetype = currentOffer.mimetype;
    item.image = currentOffer.image.toString('base64');

    const response = [item];

    return response as ReturnType[];
  }
}
