import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "app/models/cart.model";
import { CartService } from "app/services/cart.service";

const STRIPE_PUBLIC_KEY =
  "pk_test_51PInHUARIB8UrSsV0RJH5YOc13AkLaffqxdHVnXWbN5dMQ39yKWOKo7nOhMwmOvNENHxlrhdvHUo6fqnBwKQbH4f00P8Et5050";

@Component({
  selector: "app-cart",
  templateUrl: "cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 1,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.httpClient
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (response: any) => {
        let stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        stripe?.redirectToCheckout({ sessionId: response.session.id });
      });
  }
}
