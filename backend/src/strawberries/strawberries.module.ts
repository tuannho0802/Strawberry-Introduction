import { Module } from '@nestjs/common';
import { StrawberriesController } from './strawberries.controller';
import { StrawberriesService } from './strawberries.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ImgbbModule } from 'src/imgbb/imgbb.module';

@Module({
  imports: [FirebaseModule, ImgbbModule],
  controllers: [StrawberriesController],
  providers: [StrawberriesService],
})
export class StrawberriesModule {}
