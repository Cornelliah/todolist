import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from "typeorm"
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  
  imports: [
    ConfigModule, 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      
      useFactory: (configService: ConfigService) => {
        
          return {
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: false,
          };
      },
    }),
  ],
})
export class PostGresModule {}
