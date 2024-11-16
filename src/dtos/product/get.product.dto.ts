import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/entities/product.entity';

@StaticImplements<BaseStaticDTO>()
export class GetProductDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  weight!: number;

  @IsNumber()
  sellingPrice!: number;

  /*@IsString()       //TODO - Implement service to read image and set imgData and also the other way around
  imgData!: string;*/

  public static from(product: any) : GetProductDTO {
    const theProduct = product as Product;

    const ret = new GetProductDTO();
    ret.id = theProduct.id;
    ret.name = theProduct.name;
    ret.description = theProduct.description;
    ret.weight = theProduct.weight;
    ret.sellingPrice = theProduct.sellingPrice;

    return ret;
  }

}