import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { tasksSchema } from './schemas/tasks.schema';
import { Task } from './entities/tasks.entity';
import { PostGresModule } from 'src/database/typeOrm-module';
import { MongoModule } from 'src/database/mongo-module';

@Global()
@Module({
  imports: [
    PostGresModule,
    MongoModule,
    TypeOrmModule.forFeature([Task]),
    MongooseModule.forFeature([{
      name: 'Tasks',
      schema: tasksSchema
   }]),
],
  controllers: [TasksController],
  providers: [TasksService, ConfigService],
})
export class TasksModule {}




 
 