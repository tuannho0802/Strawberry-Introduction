import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StrawberriesModule } from './strawberries/strawberries.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { ImgbbModule } from './imgbb/imgbb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirebaseModule,
    StrawberriesModule,
    UsersModule,
    AuthModule,
    ImgbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
