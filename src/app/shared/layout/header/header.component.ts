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
    { label: 'все товары', link: '/catalog' },
    { label: 'свитеры', link: '/catalog/sweaters' },
    { label: 'шарфы', link: '/catalog/scarfs' },
    { label: 'шапки', link: '/catalog/hats' },
    { label: 'балаклавы', link: '/catalog/balaklavas' },
    { label: 'подвески', link: '/catalog/charms' },
    { label: 'носки', link: '/catalog/socks' }
  ];

  protected forCustomersItems = [
    { label: 'Контакты', link: '/contacts' },
    { label: 'Наша философия', link: '/philosophy' },
    { label: 'Волонтерство', link: '/vaulonteer' },
    { label: 'Публичная оферта', link: '/oferta' },
    { label: 'Оплата и доставка', link: '/payment_delivery' },
    { label: 'Обмен и возврат', link: '/return' },
    { label: 'Уход за изделием', link: '/care' },
  ]

  constructor(private router: Router,) {}

  ngOnInit(): void {
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

}


