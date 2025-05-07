import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITaches } from './schemas/tasks.schema';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {

   private dbType:string;

   constructor(
    @InjectRepository(Task) private pgRepo: Repository<Task>,
    @InjectModel ('Tasks') private readonly tasksModel: Model <ITaches>,
    private configService: ConfigService,
   ) {
      this.dbType = this.configService.get<string>('DB_TYPE') ?? 'postgres';
   }

  async createTask(payload: CreateTaskDto ) {

    if (this.dbType === 'postgres') {
      const task = this.pgRepo.create({  titre: payload.titre  });
      return this.pgRepo.save(task);
    }
    else{
    const createdTask = new this.tasksModel(payload);
    return createdTask.save();
    }
  }

 toTaskDto (task:any){
    return {
      id: task._id?.toString(),
      titre: task.titre,
      done: task.done,
      edited:task.edited
    };
  }
  async findAll() {

   if (this.dbType === 'postgres') {
      return this.pgRepo.find();
    }
    const tasks = await this.tasksModel.find();
    return tasks.map(this.toTaskDto);
  }

 async findOne(id) {
   if (this.dbType === 'postgres') {
      const task = await this.pgRepo.findOne({where: { id: id } });
      if (!task) {
         throw new NotFoundException('Task not found');
       }
       return task;
    }
    else{
    const task = await this.tasksModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
  }

 async update(id, payload: UpdateTaskDto) {

   if (this.dbType === 'postgres') {
      const task = await this.pgRepo.findOne({ where: { id: id } });
      if (!task) {
        throw new NotFoundException('Task not found');
      }

      Object.assign(task, payload);
      return this.pgRepo.save(task);
    }
    else{
    const updatedTask = await this.tasksModel.findByIdAndUpdate(id, payload);
       if (!updatedTask) {
          throw new NotFoundException('Task not found');
       }
       return updatedTask;
      }
  }

  async deleteTask(id) {
   if (this.dbType === 'postgres') {
      return this.pgRepo.delete(id);
    }
    else{
   const deletedTask = await this.tasksModel.findByIdAndDelete(id);
   return deletedTask;
  }
}


}


 
 

