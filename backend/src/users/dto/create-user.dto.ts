import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user.',
  })
  username: string;

  @ApiProperty({
    example: 'supersecretpassword',
    description: 'The password of the user.',
  })
  password: string;

  @ApiProperty({
    example: Role.USER,
    enum: Role,
    description: 'The role of the user.',
  })
  role: Role;
}
