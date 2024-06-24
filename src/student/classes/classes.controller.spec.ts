import { Test, TestingModule } from '@nestjs/testing';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { DataSource } from 'typeorm';
import { mockDataSource, mockRepository } from '../../utils/mocks/datasource.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentClass } from './entities/student-class.entity';
import { User } from '../../user/entities/user.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { ClassSchedulesService } from '../class-schedules/class-schedules.service';
import { GoogleSpreadSheetService } from '../../shared/google-spread-sheet/google-spread-sheet.service';
import { ConfigService } from '@nestjs/config';

describe('ClassesController', () => {
  let controller: ClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassesController],
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
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Payment),
          useValue: mockRepository,
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

    controller = module.get<ClassesController>(ClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
