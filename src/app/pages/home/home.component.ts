import { Component } from "@angular/core";
import { Product } from "app/models/product.model";
import { CartService } from "app/services/cart.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns];
  category: string | undefined;

  constructor(private cartService: CartService) {}

  onColumnsCountChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columns];
  }

  onShowCategory(selectedCategory: string): void {
    this.category = selectedCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
}
