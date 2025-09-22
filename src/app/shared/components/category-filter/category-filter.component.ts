import {Component, Input, OnInit} from '@angular/core';
import {CategoriesType} from "../../../../types/categories.type";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() category: CategoriesType | null = null;
  protected open: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.open = !this.open;
  }


}
