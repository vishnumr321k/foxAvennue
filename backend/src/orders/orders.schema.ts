import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    userId: string;

    @Prop([
        {
        productId: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true},
        size: {type: String},
        },
    ])
    items:{
        productId: string,
        quantity: number,
        size?: string
    }[];


    @Prop({required:true})
    totalAmount: number;

    @Prop({default: 'pending'})
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);