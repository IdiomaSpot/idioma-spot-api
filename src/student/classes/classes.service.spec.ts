import { Test, TestingModule } from '@nestjs/testing';
import { ClassesService } from './classes.service';
import { DataSource } from 'typeorm';
import { mockDataSource, mockRepository } from '../../utils/mocks/datasource.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentClass } from './entities/student-class.entity';
import { User } from '../../user/entities/user.entity';
import { Payment } from '../../payment/entities/payment.entity';

describe('ClassesService', () => {
  let service: ClassesService;

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
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Payment),
          useValue: mockRepository,
        },
        ClassesService,
      ],
    }).compile();

    service = module.get<ClassesService>(ClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
