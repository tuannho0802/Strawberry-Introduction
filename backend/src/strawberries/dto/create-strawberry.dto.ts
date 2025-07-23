import { ApiProperty } from '@nestjs/swagger';

export class CreateStrawberryDto {
  @ApiProperty({
    example: 'Albion',
    description: 'The name of the strawberry variety.',
  })
  name: string;

  @ApiProperty({
    example: 'A popular day-neutral variety known for its large, firm, and sweet fruit.',
    description: 'A brief description of the strawberry.',
  })
  description: string;

  @ApiProperty({
    example: 'https://example.com/images/albion.jpg',
    description: 'The URL of an image of the strawberry.',
  })
  imageUrl: string;
}
