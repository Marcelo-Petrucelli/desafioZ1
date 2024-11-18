import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsEnum } from 'class-validator';
import { PaymentMethod } from 'src/entities/order.entity';

@StaticImplements<BaseStaticDTO>()
export class PlaceOrderDTO {

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  public static from(order: any) : PlaceOrderDTO { //Shouldn't be used for now
    const ret = new PlaceOrderDTO();
    return ret;
  }

}