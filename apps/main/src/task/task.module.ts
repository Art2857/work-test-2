import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskProvider } from '../entities/task.provider';
import { DatabaseModule } from '@shared/database';
import { GroupProvider } from '../entities/group.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, TaskProvider, GroupProvider],
})
export class TaskModule {}
