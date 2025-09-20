import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, StringExpressionOperatorReturningBoolean } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUserProfile(
    userId: string,
    updateData: {
      name?: string;
      password?: string;
    },
  ): Promise<UserDocument | null> {
    let updateField: any = {};

    if (updateData.name) {
      updateField.name = updateData.name;
    }

    if (updateData.password) {
      updateField.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.userModel.findByIdAndUpdate(userId, updateField, { new: true });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
