import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'apps/auth/src/strategies/auth.decorator';
import { UserRole } from 'apps/auth/src/user-role.enum';
import { CreateGroupDto, UpdateGroupDto } from './group.dtos';
import { GroupService } from './group.service';

@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({
    summary:
      'Получение только списка групп без задач (Если true - Получение списка групп с задачами)',
  })
  @Auth(UserRole.Reader)
  @Get('')
  getGroups(@Query('extends') extendsTasks: boolean) {
    return this.groupService.getGroups(extendsTasks);
  }

  @ApiOperation({ summary: 'Получение группы с задачами' })
  @Auth(UserRole.Reader)
  @Get('/:id')
  getGroup(@Param('id') id: number) {
    return this.groupService.getGroup(id);
  }

  @ApiOperation({ summary: 'Создание группы' })
  @Auth(UserRole.Admin)
  @Post('')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Изменение группы' })
  @Auth(UserRole.Admin)
  @Patch('/:id')
  updateGroup(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Удаление группы и всех задач в ней' })
  @Auth(UserRole.Admin)
  @Delete('/:id')
  deleteGroup(@Param('id') id: number) {
    return this.groupService.deleteGroup(id);
  }
}
