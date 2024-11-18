import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { GetProductDTO } from '../../dtos/product/get.product.dto';
import { OrderItem } from '../../entities/orderItem.entity';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@StaticImplements<BaseStaticDTO>()
export class GetOrderItemDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @ValidateNested()
  @Type(() => GetProductDTO)
  product!: GetProductDTO;

  @IsNumber()
  quantity!: number;

  public static from(cart: any) : GetOrderItemDTO {
    const theOrderItem = cart as OrderItem;

    const ret = new GetOrderItemDTO();
    ret.id = theOrderItem.id;
    ret.product = GetProductDTO.from(theOrderItem.product);
    ret.quantity = theOrderItem.quantity;

    return ret;
  }
  
}