import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUserProfile(
    @Req() req,
    @Body() body: { user?: string; password?: string },
  ) {
    return this.userService.updateUserProfile(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers(@Req() req){
    if(req.user.role !== 'admin'){
      return { message: 'Unauthorized ❌ Only admin can fetch all users.' };
    }

    return this.userService.findAll();
  }
}
