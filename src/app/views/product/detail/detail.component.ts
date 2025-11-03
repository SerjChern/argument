import { Component, OnInit } from '@angular/core';
import { GetSlidesService } from '../../../shared/services/get-slides.service';
import { ProductType } from '../../../../types/product.type';
import {ActivatedRoute} from "@angular/router";
import {OwlOptions} from "ngx-owl-carousel-o";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../../shared/services/cart.service";
import {ProductInCart} from "../../../../types/product-in-cart.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  protected product: ProductType | undefined;
  protected slides_soul: ProductType[] = [];
  private ProductsUrl: string = 'assets/data/products/products.json';
  private ForSoulUrl: string = 'assets/data/sliders/for-soul-slider.json';
  protected images = [
    'assets/images/with-love/love-1.png',
    'assets/images/with-love/love-2.png',
    'assets/images/with-love/love-3.png'
  ];

  protected sizes: string[] = [];
  protected colors: { color: string; icon: string }[] = []
  protected activeImage: string = '';

  //Выбранные параметры
  protected chosenColor: string = '';
  protected chosenSize: string = '';
  protected activeIndex: number | null = null;
  private selectedProduct: ProductInCart  = {
    name: '',
    price: 0,
    quantity: 0,
    image: '',
    size: '',
    color: ''
  };


  constructor(private route: ActivatedRoute,
              private getSlidesService: GetSlidesService,
              private cartService: CartService,
              private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    // Subscribe to route param changes
    this.route.paramMap.subscribe(params => {
      const productUrl = params.get('url');
      if (productUrl) {
        // ✅ Reset fields before loading new product
        this.product = undefined;
        this.colors = [];
        this.sizes = [];
        this.chosenColor = '';
        this.activeImage = '';

        this.getSlidesService.getProducts(this.ProductsUrl).subscribe(products => {
          this.product = products.find(p => p.url === productUrl);
          if (this.product){
            this.activeImage = this.product.image; // initial main image
            if (this.product.color) {
              this.chosenColor = this.product.color;
            }
            if (this.product.otherSizes) {
              this.sizes = this.product.otherSizes;
              console.log(this.sizes);
            }
            if (this.product.otherColors){
              this.colors = this.product.otherColors;
            }
          }
        });

        // 👇 Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // load "for soul" slides once
    this.getSlidesService.getProducts(this.ForSoulUrl).subscribe(data => {
      this.slides_soul = data;
    });
  }


  protected setActiveImage(img: string) {
    this.activeImage = img;
  }

  protected setColor(color: string) {
    this.chosenColor = color;
  }

  protected setSize(index: number) {
    this.activeIndex = index;
    if (this.product?.otherSizes) {
      this.chosenSize = this.product?.otherSizes[index];
    }
  }

  protected addToCart(){
    if (!this.product) return;

    // ✅ Validation: require size if available
    if (this.product.otherSizes && !this.chosenSize) {
      this._snackBar.open('Пожалуйста, выберите размер', '', {
        duration: 2000,
        panelClass: ['snack-center']
      });
      return;
    }

    // ✅ Create a fresh object each time
    const productToAdd: ProductInCart = {
      name: this.product.title,
      price: this.product.price,
      quantity: 1,
      image: this.product.image,
      size: this.chosenSize || '',
      color: this.chosenColor || ''
    };

    this.cartService.addToCart(productToAdd);
    this._snackBar.open('Товар добавлен в корзину', '', {
      duration: 2000,
      panelClass: ['snack-center']
    });
  }

  customOptionsSoul: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 0,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      768: { items: 1 }
    },
    nav: false
  };

}
