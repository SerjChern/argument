import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ProductInCart} from "../../../../types/product-in-cart.type";
import {CartService} from "../../../shared/services/cart.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  private sub!: Subscription;
  protected cartItems: ProductInCart[] = [];
  protected price: number = 0;
  protected deliveryPrice: number = 500;
  protected totalPrice: number = 0;

  selectedPaymentOption: string | null = 'Картой при получении заказа';
  paymentOptions = ['Картой при получении заказа',
                            'Наличными при получении',
                            'Онлайн'];
  selectedDeliveryOption: string | null = 'Доставка в пункт выдачи';
  paymentDeliveryOptions = ['Доставка курьером',
                                    'Доставка в пункт выдачи'];

  orderForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house: ['', [Validators.required]],
    flat: ['', [Validators.required]],
  })


  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router,) { }

  ngOnInit(): void {
    this.sub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      // ✅ Always recalculate from scratch
      this.recalculateTotal();
    });
    this.totalPrice = this.price;
  }

  selectPaymentOption(option: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    // ✅ If the user tries to uncheck the only selected one — prevent it
    if (!checkbox.checked && this.selectedPaymentOption === option) {
      checkbox.checked = true;
      return;
    }

    this.selectedPaymentOption = option;
  }

  selectDeliveryOption(option: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    // ✅ If the user tries to uncheck the only selected one — prevent it
    if (!checkbox.checked && this.selectedDeliveryOption === option) {
      checkbox.checked = true;
      return;
    }
    this.selectedDeliveryOption = option;

    if (this.selectedDeliveryOption === 'Доставка курьером') {
      this.totalPrice = this.price + this.deliveryPrice;
    } else {
      this.totalPrice = this.price;
    }
  }

  private recalculateTotal(): void {
    this.price = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    if (this.orderForm.invalid) {
      this._snackBar.open('Заполните данные', '', {
        duration: 2000,
        panelClass: ['snack-center']
      });
      return;
    }
    this._snackBar.open('Заказ успешно размещен', '', {
      duration: 2000,
      panelClass: ['snack-center']
    });
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
