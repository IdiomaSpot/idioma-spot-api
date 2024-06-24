import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MercadoPagoService } from '../shared/payment-processor/mercado-pago/mercado-pago.service';
import { Payment } from './entities/payment.entity';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { mockDataSource, mockRepository } from '../utils/mocks/datasource.mock';
import { User } from '../user/entities/user.entity';
import { ClassesService } from '../student/classes/classes.service';
import { StudentClass } from '../student/classes/entities/student-class.entity';
import { ClassSchedulesService } from '../student/class-schedules/class-schedules.service';
import { GoogleSpreadSheetService } from '../shared/google-spread-sheet/google-spread-sheet.service';
import { ConfigService } from '@nestjs/config';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: getRepositoryToken(Payment),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(StudentClass),
          useValue: mockRepository,
        },
        PaymentService,
        MercadoPagoService,
        UserService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        },
        ClassesService,
        ClassSchedulesService,
        GoogleSpreadSheetService,
        ConfigService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        }
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
