
import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common'
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController{

  constructor(private tasksService: TasksService) {}

  @Post()
  async addProduct(
    @Body('description') taskDesc: string,
    @Body('status') taskStatus: string,
    @Body('goalid') taskGoalid: string,
  ) {
    const generatedId = await this.tasksService.insertTask(
      taskDesc,
      taskStatus,
      taskGoalid,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Get(':id')
  getTask(@Param('id') taskId: string){
    return this.tasksService.getSingleTask(taskId);
    }

    @Patch(':id')
   async updateProduct(
      @Param('id') taskId: string,
      @Body('description') taskDesc: string,
      @Body('status') taskStatus: string,
      @Body('goalid') taskGoalid: string,){
    await this.tasksService.updateTask(
      taskId,
      taskDesc,
      taskStatus,
      taskGoalid,
    );
    return null;
    }

  @Patch(':status/:id')
  async updateGoalOrder(
    @Param('id') taskId: string,
    @Body('status') taskStatus: string,
  ) {
    await this.tasksService.updateTaskStatus(taskId, taskStatus);
    return null;
  }

    @Delete(':id')
   async removeProduct(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return null;
    }


    @Get('goal/:goalid')
  async getAllTasksToGoal(
      @Param('goalid') goalid: string,

    ){
    const tasks = await this.tasksService.getTasksToGoal(goalid);
    return tasks;
  }














}
