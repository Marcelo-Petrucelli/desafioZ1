import { Controller, DefaultValuePipe, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { DBService } from 'src/services/main/main.database.service';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from 'src/entities/product.repository';
import { ProductDTO } from 'src/dtos/product.dto';
import { Request } from 'express';

@Controller('product')
export class ProductController {

  private readonly productRepo: ProductRepository;
  constructor(private dbService: DBService){
    this.productRepo = this.dbService.em.getRepository(Product);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const foundProduct = await this.productRepo.findOne(id);
    if(!foundProduct){
      throw NotFoundException;
    }
    return ProductDTO.from(foundProduct);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async postCreateProduct(@Req() req: Request) {
    return req.user;
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async getListProducts(@Query('max', new DefaultValuePipe(-1), ParseIntPipe) max: number, @Req() req: Request) {
    return max === -1 ? await this.productRepo.findAll() : await this.productRepo.findAll({ limit: max });
  }

}
