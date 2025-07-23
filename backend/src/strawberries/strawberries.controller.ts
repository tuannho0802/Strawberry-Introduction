import { CreateStrawberryDto } from './dto/create-strawberry.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StrawberriesService } from './strawberries.service';
import { Strawberry } from './entities/strawberry.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/entities/user.entity';

@ApiTags('strawberries')
@Controller('strawberries')
export class StrawberriesController {
  constructor(private readonly strawberriesService: StrawberriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new strawberry' })
  @ApiResponse({
    status: 201,
    description: 'The strawberry has been successfully created.',
    type: Strawberry,
  })
  create(@Body() createStrawberryDto: CreateStrawberryDto) {
    return this.strawberriesService.create(createStrawberryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all strawberries' })
  @ApiResponse({
    status: 200,
    description: 'Return all strawberries.',
    type: [Strawberry],
  })
  findAll() {
    return this.strawberriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a strawberry by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a single strawberry.',
    type: Strawberry,
  })
  findOne(@Param('id') id: string) {
    return this.strawberriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a strawberry' })
  @ApiResponse({
    status: 200,
    description: 'The strawberry has been successfully updated.',
    type: Strawberry,
  })
  update(@Param('id') id: string, @Body() strawberry: Partial<Strawberry>) {
    return this.strawberriesService.update(id, strawberry);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a strawberry' })
  @ApiResponse({
    status: 204,
    description: 'The strawberry has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.strawberriesService.remove(id);
  }
}
