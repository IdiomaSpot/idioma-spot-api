import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { Promo } from './entities/promo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromoRequestDTO } from './dtos/promo-create.dto';
import * as sharp from 'sharp';

@Injectable()
export class PromoService extends GenericService<Promo> {
  private readonly MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  private readonly MAX_WIDTH = 800;
  private readonly MAX_HEIGHT = 800;

  constructor(
    @InjectRepository(Promo)
    private readonly promoRepository: Repository<Promo>,
  ) {
    super(promoRepository);
  }

  async createPromo(
    file: Express.Multer.File,
    promoRequest: PromoRequestDTO,
  ): Promise<Promo> {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException('File is too large');
    }

    const optimizedImage = await sharp(file.buffer)
      .resize(this.MAX_WIDTH, this.MAX_HEIGHT, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat('jpeg', { quality: 80 }) // Convert to JPEG with quality 80
      .toBuffer();

    const newPromo = new Promo();
    newPromo.image = optimizedImage;
    newPromo.mimetype = 'image/jpeg';
    newPromo.title = promoRequest.title;
    newPromo.description = promoRequest.description;
    newPromo.enableSignUpButton = promoRequest.enableSignUpButton;

    return await super.create(newPromo);
  }
}
