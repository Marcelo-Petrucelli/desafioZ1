import { EntityRepository, ref } from '@mikro-orm/mysql';
import { CartItemRepository } from './cartItem.repository';
import { ProductRepository } from './product.repository';
import { User } from './user.entity';
import { Cart } from 'src/entities/cart.entity';
import { Product } from './product.entity';
import { CartItem } from './cartItem.entity';
import { CartDTO } from 'src/dtos/cart.dto';

export class CartRepository extends EntityRepository<Cart> {

  async createCartFromDTO(user: User, cartDTO: CartDTO){
    const cartRepo: CartRepository = this.em.getRepository(Cart);

    const newCart = cartRepo.create({ //Send this to the Entity, as some static 'to' method
        owner: user,
        discount: cartDTO.discount,
    });

    if(cartDTO.productIds && cartDTO.productIds.length > 0){
      await this.addProductIdsToCart(newCart, cartDTO.productIds);
    }
    this.em.persist(newCart);
    user.cart = ref(newCart);
    this.em.persist(user);
  }

  async addProductIdsToCart(cart: Cart, productIds: number[]){
    const productRepo: ProductRepository = this.em.getRepository(Product);
    const cartItemRepo: CartItemRepository = this.em.getRepository(CartItem);

    const setProductIdList = new Set(productIds);
    const products = await productRepo.find(Array.from(setProductIdList));
    
    products.forEach((product) => {
        const newCartItem = cartItemRepo.create({
        cart: cart,
        product: product,
        quantity: productIds.filter((repeatedProductId) => {
            return repeatedProductId == product.id;
        }).length
        });
        cart.cartItem.add(newCartItem);
        this.em.persist(newCartItem);
    });
  }
}