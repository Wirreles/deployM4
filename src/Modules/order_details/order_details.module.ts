import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderDetails from '../../entities/orders_details.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderDetails])],
  providers: [OrderDetailsService],
  controllers: [OrderDetailsController]
})
export class OrderDetailsModule {}
