import { EntityTarget, ObjectLiteral } from 'typeorm';
import { InjectionToken, Provider } from '@nestjs/common';
import { AppDataSource } from './data-source';
import { DATABASE_CONNECTION } from './database.providers';

export function repositoryEntityProvider(
  provide: InjectionToken,
  target: EntityTarget<ObjectLiteral>,
): Provider {
  return {
    provide,
    useFactory: () => AppDataSource.getRepository(target),
    inject: [DATABASE_CONNECTION],
  };
}
