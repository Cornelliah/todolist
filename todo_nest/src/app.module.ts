import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database-providers';
import { ConfigModule} from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [
   ConfigModule.forRoot ({
    isGlobal:true,
  }),
    DatabaseModule,
    TasksModule,
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
