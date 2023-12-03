import { repositoryEntityProvider } from '@shared/database/repository.provider';
import { GroupEntity } from './group.entity';

// export const GROUP_REPOSITORY = 'GROUP_REPOSITORY';

export const GroupProvider = repositoryEntityProvider(GroupEntity, GroupEntity);
