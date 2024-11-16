import { StaticImplements, BaseStaticDTO } from './base.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/entities/product.entity';

@StaticImplements<BaseStaticDTO>()
export class ProductDTO {

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
  buyPrice!: number;

  @IsNumber()
  sellPrice!: number;

  @IsString()
  imgData!: string;

  public static from(product: any) : ProductDTO {
      return new ProductDTO();
  }

}