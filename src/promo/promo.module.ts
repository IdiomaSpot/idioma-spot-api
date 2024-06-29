import { Module } from '@nestjs/common';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { Promo } from './entities/promo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Promo])],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
