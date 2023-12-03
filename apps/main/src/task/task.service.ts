import { Inject, Injectable } from '@nestjs/common';

import { In, Repository } from 'typeorm';
import { GroupEntity } from '../entities/group.entity';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto, SetTaskDoneDto } from './task.dtos';

@Injectable()
export class TaskService {
  constructor(
    @Inject(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    @Inject(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find({ relations: ['groups'] });
  }

  async getTask(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['groups'],
    });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = new TaskEntity();
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;

    const groups = await this.groupRepository.findBy({
      id: In(createTaskDto.groupIds),
    });
    task.groups = groups;

    return this.taskRepository.save(task);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new Error('Task not found');
    }

    task.name = updateTaskDto.name;
    task.description = updateTaskDto.description;

    const groups = await this.groupRepository.findBy({
      id: In(updateTaskDto.groupIds),
    });
    task.groups = groups;

    return this.taskRepository.save(task);
  }

  async setTaskDone(
    id: number,
    setTaskDoneDto: SetTaskDoneDto,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new Error('Task not found');
    }

    task.isCompleted = setTaskDoneDto.isCompleted;

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    return this.taskRepository.delete(id);
  }
}
