import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')

export class TasksController {

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() payload: CreateTaskDto) {
    return this.tasksService.createTask(payload);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTaskDto) {
    return this.tasksService.update(id, payload);
  }

  @Patch(':id')
  toggleDone(@Param('id') id: string, @Body() payload: UpdateTaskDto) {
    return this.tasksService.update(id, payload);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
