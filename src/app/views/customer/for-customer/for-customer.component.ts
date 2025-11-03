import { Component, OnInit } from '@angular/core';
import {GetSlidesService} from "../../../shared/services/get-slides.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'for-customer',
  templateUrl: './for-customer.component.html',
  styleUrls: ['./for-customer.component.scss']
})
export class ForCustomerComponent implements OnInit {
  selectedSection: string | null = null;

  protected forCustomersItems = [
    { label: 'Контакты', key: 'contacts' },
   /* { label: 'Наша философия', key: 'philosophy' },*/
    { label: 'Волонтерство', key: 'volunteer' },
    { label: 'Публичная оферта', key: 'offer' },
    { label: 'Оплата и доставка', key: 'payment' },
    { label: 'Обмен и возврат', key: 'return' },
    { label: 'Уход за изделием', key: 'care' },
  ];

  protected firstHalf = this.forCustomersItems.slice(0, Math.ceil(this.forCustomersItems.length / 2));
  protected secondHalf = this.forCustomersItems.slice(Math.ceil(this.forCustomersItems.length / 2));

  protected ofertaText: string = '';
  protected paymentText: string = '';
  protected returnText: string = '';
  protected title: string = '';

  protected selectedItem = this.forCustomersItems[3]; // ✅ default visible section
  constructor(private getSlides: GetSlidesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.selectedItem.label;

    this.getSlides.getString('assets/data/for-customer/oferta.json').subscribe(data => {
      this.ofertaText = data;
    })
    this.getSlides.getString('assets/data/for-customer/payment.json').subscribe(data => {
      this.paymentText = data;
    })
    this.getSlides.getString('assets/data/for-customer/return.json').subscribe(data => {
      this.returnText = data;
    })
    this.route.queryParams.subscribe(params => {
      this.selectedSection = params['section'] || null;
      if (this.selectedSection) {
        const foundItem = this.forCustomersItems.find(item => item.key === this.selectedSection );

        if (foundItem) {
          this.selectedItem = foundItem;
          this.title = this.selectedItem.label
        }
      } else {
        this.selectedItem = this.forCustomersItems[3]; // no ?section param
      }
    });

  }

  protected selectItem(item: any) {
    this.selectedItem = item;
    this.title = item.label
  }


}
