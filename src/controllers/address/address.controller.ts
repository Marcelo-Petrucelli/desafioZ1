import { Controller, DefaultValuePipe, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { DBService } from 'src/services/main/main.database.service';
import { Address } from 'src/entities/address.entity';
import { AddressRepository } from 'src/entities/address.repository';
import { Request } from 'express';

@Controller('address')
export class AddressController {

  private readonly addressRepo: AddressRepository;
  constructor(private dbService: DBService){
    this.addressRepo = this.dbService.em.getRepository(Address);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getAddress(@Param('id', ParseIntPipe) id: number) {
    const foundAddress = await this.addressRepo.findOne(id);
    if(!foundAddress){
      throw NotFoundException;
    }
    return new AddressDTO.from(foundAddress);
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async getListAddresses(@Query('max', new DefaultValuePipe(-1), ParseIntPipe) max: number, @Req() req: Request) {
    return max === -1 ? await this.addressRepo.findAll() : await this.addressRepo.findAll({ limit: max });
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async postAddProductToCart(@Req() req: Request) {
    return req.user;
  }

  @Post('/remove')
  @UseGuards(JwtAuthGuard)
  async postRemoveProductFromCart(@Req() req: Request) {
    return req.user;
  }

}
