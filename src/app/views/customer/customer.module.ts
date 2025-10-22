import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ForCustomerComponent } from './for-customer/for-customer.component';


@NgModule({
  declarations: [
    ForCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
