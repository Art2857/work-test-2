import { Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { GroupEntity } from '../entities/group.entity';
import { TaskEntity } from '../entities/task.entity';
import { CreateGroupDto, UpdateGroupDto } from './group.dtos';

@Injectable()
export class GroupService {
  constructor(
    @Inject(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    @Inject(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getGroups(extendsTasks: boolean): Promise<GroupEntity[]> {
    if (extendsTasks) {
      return this.groupRepository.find({ relations: ['tasks'] });
    }
    return this.groupRepository.find();
  }

  async getGroup(id: number) {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    const group = new GroupEntity();
    group.name = createGroupDto.name;
    group.description = createGroupDto.description;

    return this.groupRepository.save(group);
  }

  async updateGroup(
    id: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<GroupEntity> {
    const group = await this.groupRepository.findOneBy({ id });

    if (!group) {
      throw new Error('Group not found');
    }

    group.name = updateGroupDto.name;
    group.description = updateGroupDto.description;

    return this.groupRepository.save(group);
  }

  async deleteGroup(id: number) {
    return this.groupRepository.delete(id);
  }
}
