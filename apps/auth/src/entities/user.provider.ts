import { repositoryEntityProvider } from '@shared/database/repository.provider';
import { UserEntity } from './user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const UserProvider = repositoryEntityProvider(
  USER_REPOSITORY,
  UserEntity,
);
