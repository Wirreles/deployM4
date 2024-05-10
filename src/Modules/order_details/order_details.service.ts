import { Injectable } from '@nestjs/common';
import OrderDetails from '../../entities/orders_details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OrderDetailsService {
    constructor(@InjectRepository(OrderDetails) private OrderDetailRepository: Repository<OrderDetails>){}
    
    async getOrderDetails() {
        return await this.OrderDetailRepository.find({
            relations: {
                products: true,
                order_id: true
            }
        });
    }
    
    async addOrderDetails(orderDetail: Omit<OrderDetails, "id">) {
        const newOrderDetail = await this.OrderDetailRepository.create(orderDetail)
        await this.OrderDetailRepository.save(newOrderDetail);
        return newOrderDetail
    }

}
