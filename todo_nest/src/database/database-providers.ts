import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoModule } from './mongo-module';
import { PostGresModule } from './typeOrm-module';

const DB_TYPE = process.env.DB_TYPE; 

const databaseModule =
  DB_TYPE === 'postgres'
    ? PostGresModule
    : DB_TYPE === 'mongo'
    ? MongoModule
    : (() => {
        throw new Error('Invalid DB_TYPE value (should be "postgres" or "mongo")');
      })();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    databaseModule,
  ],
})
export class DatabaseModule {}






  