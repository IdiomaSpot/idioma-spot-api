import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferRequestDTO } from './dtos/offer-create.dto';
import * as sharp from 'sharp';

@Injectable()
export class OfferService extends GenericService<Offer> {
  private readonly MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  private readonly MAX_WIDTH = 800;
  private readonly MAX_HEIGHT = 800;

  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {
    super(offerRepository);
  }

  async createOffer(
    file: Express.Multer.File,
    offerRequest: OfferRequestDTO,
  ): Promise<Offer> {
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

    const newOffer = new Offer();
    newOffer.image = optimizedImage;
    newOffer.mimetype = 'image/jpeg';
    newOffer.description = offerRequest.description;
    newOffer.enableSignUpButton = offerRequest.enableSignUpButton;

    return await super.create(newOffer);
  }
}
