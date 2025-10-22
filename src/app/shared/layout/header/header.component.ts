import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import {Router, NavigationEnd, Event as RouterEvent} from "@angular/router";
import {filter} from "rxjs";
import {CartService} from "../../services/cart.service";
import {ForCustomersType} from "../../../../types/for-customers.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeMenu', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-10px)',
        display: 'none'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)',
        display: 'block'
      })),
      transition('hidden => visible', [
        style({ display: 'block' }),
        animate('300ms ease-out')
      ]),
      transition('visible => hidden', [
        animate('300ms ease-in', style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  protected menu: boolean = false;
  protected isHome = false;

  protected menuItems = [
    { label: 'все товары', categoryId: '', sub: '' },
    { label: 'свитеры', categoryId: '1', sub: 'Свитеры' },
    { label: 'шарфы', categoryId: '2', sub: 'Шарфы' },
    { label: 'шапки', categoryId: '1', sub: 'Шапки' },
    { label: 'балаклавы', categoryId: '1', sub: 'Балаклавы' },
    { label: 'подвески', categoryId: '2', sub: 'Подвески' },
    { label: 'носки', categoryId: '1', sub: 'Носки' }
  ];

  protected forCustomersItems: ForCustomersType[] = [
    { label: 'Контакты', link: '/for_customers', query: 'contacts' },
   /* { label: 'Наша философия', link: '/for_customers', query: 'return' },*/
    { label: 'Волонтерство', link: '/for_customers', query: 'volunteer' },
    { label: 'Публичная оферта', link: '/for_customers', query: 'offer' },
    { label: 'Оплата и доставка', link: '/for_customers', query: 'payment' },
    { label: 'Обмен и возврат', link: '/for_customers', query: 'return'},
    { label: 'Уход за изделием', link: '/for_customers', query: 'care' },
  ]

  constructor(private router: Router,
              private cartService: CartService) {}

  protected productCount: number = 0;

  ngOnInit(): void {
    // 🔥 Automatically updates whenever cart changes
    this.cartService.cart$.subscribe(items => {
      this.productCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
    // 1️⃣ Initial route check
    this.isHome = this.router.url === '/';
    console.log('Initial route:', this.router.url, 'isHome=', this.isHome);

    // 2️⃣ Listen to future navigation events
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isHome = event.urlAfterRedirects === '/';
        this.menu = false; // 👈 automatically close menu
        console.log('NavigationEnd:', event.urlAfterRedirects, 'isHome=', this.isHome);
      });
  }

  menuAction(): void {
    this.menu = !this.menu;
  }

  // ✅ Getter combining both conditions
  get isHomeAndMenuClosed(): boolean {
    return this.isHome && !this.menu;
  }

  getQueryParams(item: any) {
    const params: any = {};

    if (item.categoryId) {
      params.categoryId = item.categoryId;
    }

    if (item.sub) {
      params.sub = item.sub;
    }

    // ⚙️ If no filters, return null so Angular won’t append ? at all
    return Object.keys(params).length ? params : null;
  }

  //protected readonly it = it;
}


