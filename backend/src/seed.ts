import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StrawberriesService } from './strawberries/strawberries.service';
import { UsersService } from './users/users.service';
import { Role } from './users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const strawberriesService = app.get(StrawberriesService);
  const strawberries = await strawberriesService.findAll();
  if (strawberries.length === 0) {
    await strawberriesService.create({
      name: 'Albion',
      description:
        'A popular variety known for its large, conical fruit and consistently sweet flavor.',
      imageUrl: 'https://www.gurneys.com/product/albion_strawberry_plant',
    });
    await strawberriesService.create({
      name: 'Seascape',
      description:
        'A day-neutral variety that produces large, flavorful berries throughout the summer.',
      imageUrl: 'https://www.gurneys.com/product/seascape_strawberry_plant',
    });
    await strawberriesService.create({
      name: 'Chandler',
      description:
        'A June-bearing variety that produces very large, firm, and flavorful berries.',
      imageUrl: 'https://www.gurneys.com/product/chandler_strawberry_plant',
    });
  }

  const usersService = app.get(UsersService);
  const admin = await usersService.findOne('admin');
  if (!admin) {
    await usersService.create({
      username: 'admin',
      password: 'adminpassword',
      confirmPassword: 'adminpassword',
      role: Role.ADMIN,
    });
  }

  await app.close();
  console.log('Seeding complete!');
}

bootstrap();

