import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "app/models/product.model";
import { CartService } from "app/services/cart.service";
import { StoreService } from "app/services/store.service";
import { Subscription } from "rxjs";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  limit = "12";
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.limit, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columns];
  }

  onShowCategory(selectedCategory: string): void {
    this.category = selectedCategory;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChangee(itemCount: number): void {
    this.limit = itemCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
