import { DataSource } from 'typeorm';

export const mockDataSource = {
  createEntityManager: jest.fn(),
  createQueryRunner: jest.fn(),
};

export const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
