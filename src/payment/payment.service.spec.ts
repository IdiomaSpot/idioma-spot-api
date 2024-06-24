import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { MercadoPagoService } from '../shared/payment-processor/mercado-pago/mercado-pago.service';
import { UserService } from '../user/user.service';
import { Payment } from './entities/payment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDataSource, mockRepository } from '../utils/mocks/datasource.mock';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ClassesService } from '../student/classes/classes.service';
import { StudentClass } from '../student/classes/entities/student-class.entity';
import { ClassSchedulesService } from '../student/class-schedules/class-schedules.service';
import { GoogleSpreadSheetService } from '../shared/google-spread-sheet/google-spread-sheet.service';
import { ConfigService } from '@nestjs/config';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: getRepositoryToken(StudentClass),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Payment),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
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

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
