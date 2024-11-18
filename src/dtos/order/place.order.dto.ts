import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { PaymentMethod } from '../../entities/order.entity';
import { IsEnum } from 'class-validator';

@StaticImplements<BaseStaticDTO>()
export class PlaceOrderDTO {

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  public static from(order: any) : PlaceOrderDTO { //Shouldn't be used for now
    const ret = new PlaceOrderDTO();
    return ret;
  }

}