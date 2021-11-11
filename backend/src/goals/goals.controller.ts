import { GoalsService } from './goals.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  async addGoals(@Body('description') goalDesc: string) {
    const generatedId = await this.goalsService.insertGoals(goalDesc);
    return { id: generatedId };
  }

  @Get()
  async getAllGoals() {
    const goals = await this.goalsService.getGoals();
    return goals;
  }

  @Get(':id')
  getGoal(@Param('id') goalId: string) {
    return this.goalsService.getSingleGoal(goalId);
  }

  @Patch(':id')
  async updateGoal(
    @Param('id') goalId: string,
    @Body('description') goalDesc: string,
  ) {
    await this.goalsService.updateGoal(goalId, goalDesc);
    return null;
  }

  @Delete(':id')
  async removeGoal(@Param('id') goalId: string) {
    await this.goalsService.deleteGoal(goalId);
    return null;
  }
}
