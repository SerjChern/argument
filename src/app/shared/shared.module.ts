import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {GetSlidesService} from "./services/get-slides.service";
import { CategoryCardComponent } from './components/category-card/category-card.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    CategoryCardComponent
  ]
})
export class SharedModule { }
