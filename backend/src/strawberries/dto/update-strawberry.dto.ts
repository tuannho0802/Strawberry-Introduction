import { PartialType } from '@nestjs/swagger';
import { CreateStrawberryDto } from './create-strawberry.dto';

export class UpdateStrawberryDto extends PartialType(CreateStrawberryDto) {}
