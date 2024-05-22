import { Component } from "@angular/core";

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns];
  category: string | undefined;
  onColumnsCountChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columns];
  }

  onShowCategory(selectedCategory: string): void {
    this.category = selectedCategory;
  }
}
