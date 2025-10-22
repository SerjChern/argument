import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    CartComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ]
})
export class OrderModule { }
