import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {GetSlidesService} from "./services/get-slides.service";
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    CategoryCardComponent,
    CategoryFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    CategoryCardComponent,
    CategoryFilterComponent
  ]
})
export class SharedModule { }
