import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './orders.schema';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/cart/cart.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  async placeOrder(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId');

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart is empty...');
    }

    const totalAmount = cart.items.reduce((sum, item: any) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    const newOrder = new this.orderModel({
      userId,
      items: cart.items,
      totalAmount,
      status: 'pending',
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    return newOrder;
  }

  async getOrder(userId: string){
    return this.orderModel.find({userId}).populate('items.productId', 'name, price, size images');
  }
}
