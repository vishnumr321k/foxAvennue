import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./orders.schema";
import { Cart, CartSchema } from "src/cart/cart.schema";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";

@Module({
    imports: [MongooseModule.forFeature([
        {name: Order.name, schema: OrderSchema},
        {name: Cart.name, schema: CartSchema},
    ])],
    controllers: [OrderController],
    providers: [OrderService],
})

export class OrderModule{};