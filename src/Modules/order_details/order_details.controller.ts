import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { AuthGuard } from 'src/guards/AuthGuard';
import OrderDetails from '../../entities/orders_details.entity';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';


@ApiTags('Order Details')
@UseGuards(AuthGuard)
@Controller('orderDetails')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  getOrderDetails() {
    return this.orderDetailsService.getOrderDetails();
  }

  // @HttpCode(201)
  // @Post()
  // addOrderDetails(@Body() orderDetail: Omit<OrderDetails, 'id'>) {
  //   return this.orderDetailsService.addOrderDetails(orderDetail);
  // }
}
