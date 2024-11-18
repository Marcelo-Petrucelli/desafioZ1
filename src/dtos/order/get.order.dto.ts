import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { GetOrderItemDTO } from '../../dtos/order/get.orderItem.dto';
import { Order, PaymentMethod } from '../../entities/order.entity';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@StaticImplements<BaseStaticDTO>()
export class GetOrderDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumber()
  total!: number;

  @IsEnum({ entity: PaymentMethod })
  paymentMethod!: PaymentMethod;

  @ValidateNested({ each: true }) //Listing case, we return the whole GetProductDTO
  @Type(() => GetOrderItemDTO)
  products!: GetOrderItemDTO[];

  public static from(order: any) : GetOrderDTO {
    const theOrder = order as Order;

    const ret = new GetOrderDTO();
    ret.id = theOrder.id;
    ret.total = theOrder.total;
    ret.paymentMethod = theOrder.paymentMethod,
    ret.products = theOrder.orderItems.map((orderItem) => { return GetOrderItemDTO.from(orderItem); });

    return ret;
  }

}