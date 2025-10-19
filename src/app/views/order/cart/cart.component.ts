import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {ProductInCart} from "../../../../types/product-in-cart.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  protected cartItems: ProductInCart[] = [];
  protected price: number = 0;
  protected cartIsEmpty: boolean = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.sub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.checkIfEmpty();
      // ✅ Always recalculate from scratch
      this.recalculateTotal();
    });
  }

  checkIfEmpty() {
    if (this.cartItems.length > 0) {
      this.cartIsEmpty = false;
    } else  {
      this.cartIsEmpty = true;
    }
  }

  updateCount(index: number, newCount: number): void {
    this.cartService.updateQuantity(index, newCount);
  }

  private recalculateTotal(): void {
    this.price = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }


  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.checkIfEmpty();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
