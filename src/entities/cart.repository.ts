import { EntityRepository, ref } from '@mikro-orm/mysql';
import { User } from 'src/entities/user.entity';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { CartItemRepository } from 'src/entities/cartItem.repository';
import { ProductRepository } from 'src/entities/product.repository';
import { AlterCartDTO } from 'src/dtos/cart/alter.cart.dto';
import { CreateCartDTO } from 'src/dtos/cart/create.cart.dto';
import { BadRequestException } from '@nestjs/common';

export class CartRepository extends EntityRepository<Cart> {

  async createCartFromDTO(user: User, createCartDTO: CreateCartDTO){
    const cartRepo: CartRepository = this.em.getRepository(Cart);

    const newCart = cartRepo.create({ //Send this to the Entity, as some static 'to' method
      owner: user,
      discount: createCartDTO.discount,
    });

    if(createCartDTO.productIds && createCartDTO.productIds.length > 0){
      const alterDTO = new AlterCartDTO();
      alterDTO.productIds = createCartDTO.productIds;
      await this.addProductIdsToCart(newCart, alterDTO);
    }
    this.em.persist(newCart);
    user.cart = ref(newCart);
    this.em.persist(user);
  }

  async addProductIdsToCart(cart: Cart, alterCartDTO: AlterCartDTO){
    const productRepo: ProductRepository = this.em.getRepository(Product);
    const cartItemRepo: CartItemRepository = this.em.getRepository(CartItem);

    const setProductIdList = new Set(alterCartDTO.productIds);
    const products = await productRepo.find(Array.from(setProductIdList));
    
    await cart.cartItems.load();
    for(const productId of alterCartDTO.productIds){
      const existCartItem = cart.cartItems.find((cartItem) => { return cartItem.product.id == productId; });
      if(existCartItem){
        existCartItem.quantity++;
        if(existCartItem.product.stock <  existCartItem.quantity){
          throw new BadRequestException(`Product with id ${productId} doesn't have enough stock to add to cart. Current stock is ${existCartItem.product.stock}, trying to add ${existCartItem.quantity} of this product.`);
        }
        this.em.persist(existCartItem);
      } else {
        const prod = products.find((prod) => { return prod.id == productId; });
        if(!prod){ //Trying to add a ID that doesn't exist in database
          throw new BadRequestException(`Product with id ${productId} doesn't exist.`);
        }
        const newCartItem = cartItemRepo.create({
          cart: cart,
          product: prod,
          quantity: 1
        });
        cart.cartItems.add(newCartItem);
        this.em.persist(newCartItem);
      }
    }
    this.em.persist(cart);
  }

  async removeProductIdsFromCart(cart: Cart, alterCartDTO: AlterCartDTO){
    await cart.cartItems.load();
    for(const productId of alterCartDTO.productIds){
      const existCartItem = cart.cartItems.find((cartItem) => { return cartItem.product.id == productId; });
      if(!existCartItem){
        throw new BadRequestException(`ProductId ${productId} is not present in the user's Cart.`);
      }

      if(existCartItem.quantity - 1 <= 0){ //If we're removing the last item from CartItem
        cart.cartItems.remove(existCartItem);
      } else {
        existCartItem.quantity--;
      }
      this.em.persist(existCartItem);
    }
    if(cart.cartItems.length <= 0){
      this.em.remove(cart);
    } else {
      this.em.persist(cart);
    }
  }

}