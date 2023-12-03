import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, ArrayNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    maxLength: 64,
    required: true,
  })
  @IsString()
  @Length(1, 64)
  name: string;

  @ApiProperty({
    type: String,
    maxLength: 256,
    required: false,
  })
  @IsString()
  @Length(0, 256)
  description: string;

  @ApiProperty({
    type: [Number],
    description: 'Array of group IDs',
    example: [1, 2, 3],
  })
  groupIds: number[];
}

export class UpdateTaskDto {
  @ApiProperty({
    type: String,
    maxLength: 64,
    required: true,
  })
  @IsString()
  @Length(1, 64)
  name: string;

  @ApiProperty({
    type: String,
    maxLength: 256,
    required: false,
  })
  @IsString()
  @Length(0, 256)
  description: string;

  @ApiProperty({
    type: [Number],
    description: 'Array of group IDs',
    example: [1, 2, 3],
  })
  @ArrayNotEmpty()
  groupIds: number[];
}

export class SetTaskDoneDto {
  @ApiProperty({
    type: Boolean,
  })
  isCompleted: boolean;
}
