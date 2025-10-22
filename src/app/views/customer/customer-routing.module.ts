import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForCustomerComponent} from "./for-customer/for-customer.component";

const routes: Routes = [
  {path: 'for_customers', component: ForCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
