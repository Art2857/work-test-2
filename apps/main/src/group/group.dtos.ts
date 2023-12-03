import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateGroupDto {
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
}

export class UpdateGroupDto {
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
}
