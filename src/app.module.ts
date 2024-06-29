import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { StudentModule } from './student/student.module';
import { PaymentModule } from './payment/payment.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: configuration().ormConfig.type,
      ...configuration().ormConfig,
      autoLoadEntities: true,
      extra: {
        connectionLimit: 15, // Use a connection pool with a maximum of 15 connections
      },
    }),
    UserModule,
    StudentModule,
    PaymentModule,
    PromoModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})

export class AppModule { }
