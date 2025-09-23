import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(
    @Body()
    body: {
      userId: string;
      productId: string;
      quantity?: number;
      size?: string;
    },
  ) {
    return this.cartService.addToCart(
      body.userId,
      body.productId,
      body.quantity ?? 1,
      body.size,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:userId/:productId')
  async removeFromCart(@Param('userId') userId: string, @Param('productId') productId: string){
        return this.cartService.removeCartProduct(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string){
    return this.cartService.clearCart(userId);
  }
}
