import { Module } from '@nestjs/common';
import { StrawberriesController } from './strawberries.controller';
import { StrawberriesService } from './strawberries.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [StrawberriesController],
  providers: [StrawberriesService],
})
export class StrawberriesModule {}
