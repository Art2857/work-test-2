import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database';
import { AuthModule } from 'apps/auth/src/auth.module';
import { TaskModule } from './task/task.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [DatabaseModule, AuthModule.forRoot(true), TaskModule, GroupModule],
})
export class AppModule {}
