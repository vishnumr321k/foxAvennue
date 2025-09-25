import { Controller, UseGuards , Request, Post, Get} from "@nestjs/common";
import { OrderService } from "./orders.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@Controller('orders')
export class OrderController{
    constructor(private readonly orderService: OrderService){};

    @UseGuards(JwtAuthGuard)
    @Post('place')
    async placeOrder(@Request() req){
        return this.orderService.placeOrder(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrders(@Request() req){
        return this.orderService.getOrder(req.user.userId);
    }
}