import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {DetailComponent} from "./views/product/detail/detail.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: '', loadChildren: () => import('./views/product/product.module').then(m => m.ProductModule)},
      {path: '', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
    ]
  },

  {path: 'product/:url', component: DetailComponent},
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // 👈 scrolls to top on route change
  anchorScrolling: 'enabled',            // allows #anchors to work
  scrollOffset: [0, 0]                   // optional — top of the page
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
