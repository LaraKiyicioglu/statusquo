import { Goal } from './goals.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GoalsService {
  private goals: Goal[] = [];

  constructor(@InjectModel('Goal') private readonly goalModel: Model<Goal>) {}

  async insertGoals(desc: string) {
    const newGoal = new this.goalModel({
      description: desc,
    });
    const result = await newGoal.save();
    return result.id as string;
  }

  async getGoals() {
    const goals = await this.goalModel.find().exec();
    return goals.map((goal) => ({
      id: goal.id,
      description: goal.description,
    }));
  }

  async getSingleGoal(goalId: string) {
    const goal = await this.findGoal(goalId);
    return { id: goal.id, description: goal.description };
  }

  async updateGoal(goalId: string, desc: string) {
    const updatedGoal = await this.findGoal(goalId);
    if (desc) {
      updatedGoal.description = desc;
    }
    updatedGoal.save();
  }

  async deleteGoal(goalId: string) {
    const result = await this.goalModel.deleteOne({ _id: goalId }).exec();
    console.log(result);
  }

  private async findGoal(id: string): Promise<Goal> {
    let goal;
    try {
      goal = await this.goalModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find goal.');
    }
    if (!goal) {
      throw new NotFoundException('Could not find goal.');
    }
    return goal;
  }
}
