import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/entities/product.entity';

@StaticImplements<BaseStaticDTO>()
export class CreateProductDTO {

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
  buyingPrice!: number;

  @IsNumber()
  sellingPrice!: number;

  @IsNumber()
  stock!: number;

  /*@IsString()       //TODO - Implement service to read image and set imgData e also the other way around
  imgData!: string;*/

  public static from(product: any) : CreateProductDTO {
    const theProduct = product as Product;

    const ret = new CreateProductDTO();
    ret.id = theProduct.id;
    ret.name = theProduct.name;
    ret.description = theProduct.description;
    ret.weight = theProduct.weight;
    ret.buyingPrice = theProduct.buyingPrice;
    ret.sellingPrice = theProduct.sellingPrice;
    ret.stock = theProduct.stock;

    return ret;
  }

}