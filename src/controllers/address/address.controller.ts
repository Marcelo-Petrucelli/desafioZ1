import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth/auth.jwtAuth.guard';
import { DBService } from '../../services/main/main.database.service';
import { User } from '../../entities/user.entity';
import { Address } from '../../entities/address.entity';
import { UserRepository } from '../../entities/user.repository';
import { AddressRepository } from '../../entities/address.repository';
import { GetAddressDTO } from '../../dtos/address/get.address.dto';

@Controller('address')
export class AddressController {

  private readonly userRepo: UserRepository;
  private readonly addressRepo: AddressRepository;
  constructor(private dbService: DBService){
    this.userRepo = this.dbService.em.getRepository(User);
    this.addressRepo = this.dbService.em.getRepository(Address);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postCreateAddress(@Body(ValidationPipe) addressDTO: GetAddressDTO) {
    const foundUser = await this.userRepo.findOne(addressDTO.ownerId);
    if(!foundUser){
      throw new NotFoundException('OwnerId could not be found!');
    }
    await this.addressRepo.createAddressFromDTO(foundUser, addressDTO);
    await this.dbService.em.flush();
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  async deleteRemoveAddress(@Param('id', ParseIntPipe) id: number) { //TODO - @Param('id', AddressByIdPipe) address: addressEntity
    const foundAddress = await this.addressRepo.findOne(id);
    if(!foundAddress){
      throw new NotFoundException(`There is no address with Id ${id}.`);
    }
    await this.dbService.em.removeAndFlush(foundAddress);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getListAddresses(@Query('limit', new DefaultValuePipe(-1), new ParseIntPipe({ optional: true })) limit?: number) {
    const queried = limit === -1 ? await this.addressRepo.findAll() : await this.addressRepo.findAll({ limit: limit });
    return queried.map((address) => { return GetAddressDTO.from(address);});
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getAddress(@Param('id', ParseIntPipe) id: number) { //TODO - @Param('id', AddressByIdPipe) address: addressEntity
    const foundAddress = await this.addressRepo.findOne(id);
    if(!foundAddress){
      throw new NotFoundException('Address could not be found!');
    }
    return GetAddressDTO.from(foundAddress);
  }

}
