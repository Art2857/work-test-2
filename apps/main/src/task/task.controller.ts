import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'apps/auth/src/strategies/auth.decorator';
import { UserRole } from 'apps/auth/src/user-role.enum';
import { CreateTaskDto, UpdateTaskDto, SetTaskDoneDto } from './task.dtos';
import { TaskService } from './task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary:
      'Получение всех задач (с группами в которые они входят (если есть))',
  })
  @Auth(UserRole.Reader)
  @Get('')
  getTasks() {
    return this.taskService.getTasks();
  }

  @ApiOperation({ summary: 'Получение задачи' })
  @Auth(UserRole.Reader)
  @Get('/:id')
  getTask(@Param('id') id: number) {
    return this.taskService.getTask(id);
  }

  @ApiOperation({ summary: 'Создание задачи' })
  @Auth(UserRole.Admin)
  @Post('')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Изменение задачи' })
  @Auth(UserRole.Admin)
  @Patch('/:id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Проставить флаг завершенности для задачи' })
  @Auth(UserRole.Admin)
  @Patch('/:id/done')
  setTaskDone(@Param('id') id: number, @Body() setTaskDoneDto: SetTaskDoneDto) {
    return this.taskService.setTaskDone(id, setTaskDoneDto);
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @Auth(UserRole.Admin)
  @Delete('/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
