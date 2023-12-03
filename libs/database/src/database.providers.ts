import { AppDataSource } from './data-source';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await AppDataSource.initialize(),
  },
];
