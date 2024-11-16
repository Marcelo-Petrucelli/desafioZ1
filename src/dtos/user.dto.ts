import { StaticImplements, BaseStaticDTO } from './base.dto';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartDTO } from './cart.dto';
import { AddressDTO } from './address.dto';
import { User } from 'src/entities/user.entity';

@StaticImplements<BaseStaticDTO>()
export class UserDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsOptional()
  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  email!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  addresses?: AddressDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CartDTO)
  cart?: CartDTO;

  public static from(product: any) : UserDTO {
      return new UserDTO();
  }

}