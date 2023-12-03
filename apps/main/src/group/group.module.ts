import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupProvider } from '../entities/group.provider';
import { DatabaseModule } from '@shared/database';
import { TaskProvider } from '../entities/task.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupService, TaskProvider, GroupProvider],
})
export class GroupModule {}
