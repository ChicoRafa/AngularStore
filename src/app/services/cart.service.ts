import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cart, CartItem } from "app/models/cart.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  /*BehaviorSubject reacciona a cambios que emitimos, 
  se sucribe a ellos y va rellenando el array de items, 
  en este caso con items del tipo carro, estos contendrían nuestros productos*/
  cart = new BehaviorSubject<Cart>({ items: [] });

  //SnackBar muestra una notificación tipo push
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    //el operador propagación(...) se usa en un array literal para crear una copia superficial del array
    //en este caso, items almacena una copia del array asignado, pero en una instancia diferente
    const items = [...this.cart.value.items];

    //si ya tenemos el producto en el carro, cantidad++, si no, se añade
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart.", "Ok", { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared.", "Ok", { duration: 3000 });
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("1 tiem removed from cart.", "Ok", {
        duration: 3000,
      });
    }
    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }
}
