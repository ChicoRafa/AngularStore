import { Component, Input } from "@angular/core";
import { Cart, CartItem } from "app/models/cart.model";
import { CartService } from "app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: ``,
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService) {}

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    //asignamos la cantidad de productos mapeando la cantidad 
    //y reduciendo para tener el dato en si y no un array con el dato
    this.itemsQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }
}
