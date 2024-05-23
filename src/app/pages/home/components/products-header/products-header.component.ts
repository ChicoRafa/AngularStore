import { Component, Output, EventEmitter } from '@angular/core';
import { count } from 'console';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',
  styles: ``
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = 'desc';
  itemsShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  
  onItemsNumberUpdated(newItemsShowCount: number): void {
    this.itemsShowCount = newItemsShowCount;
    this.itemsCountChange.emit(newItemsShowCount);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
