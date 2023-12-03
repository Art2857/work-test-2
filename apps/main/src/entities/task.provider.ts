import { repositoryEntityProvider } from '@shared/database/repository.provider';
import { TaskEntity } from './task.entity';

// export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export const TaskProvider = repositoryEntityProvider(TaskEntity, TaskEntity);
