import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {GetSlidesService} from "../../../shared/services/get-slides.service";
import {CategoriesType} from "../../../../types/categories.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  protected ProductsUrl = 'assets/data/products/products.json';
  protected CategoryUrl = 'assets/data/products/categories.json';
  protected products: ProductType[] = [];
  protected categories: CategoriesType[] = [];

  constructor(private GetSlidesService: GetSlidesService) { }

  ngOnInit(): void {
    this.GetSlidesService.getProducts(this.ProductsUrl).subscribe(data => {
      this.products = data;
      console.log('Loaded slides:', this.products);
    });

    this.GetSlidesService.getCategories(this.CategoryUrl).subscribe(data => {
      this.categories = data;
      console.log('Loaded cats:', this.categories);
    })

  }

}
