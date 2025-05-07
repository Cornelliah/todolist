import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule, 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
    
          return {
            uri: configService.get('MONGO_URL'),
          };       
      },
    }),
  ],
})
export class MongoModule {}
