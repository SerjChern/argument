import {Component, OnInit, ViewChild} from '@angular/core';
import {SlideType} from "../../../types/slide.type";
import {GetSlidesService} from "../../shared/services/get-slides.service";
import {CarouselComponent, OwlOptions} from "ngx-owl-carousel-o";
import {CATEGORY_SLIDES} from "../../shared/data/category-slides";
import {ProductType} from "../../../types/product.type";
import {GiftCertificateType} from "../../../types/gift-certificate.type";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('owlCar', { static: false }) owlCar!: CarouselComponent;
  protected slides: SlideType[] = [];
  protected slides_love: ProductType[] = [];
  protected gift_certificates: GiftCertificateType[] = [];
  protected slides_soul: ProductType[] = [];
  private CategorySlidesUrl: string = 'assets/data/sliders/categories-slider.json';
  private WithLoveSlidesUrl: string = 'assets/data/sliders/with-love-slider.json';
  private CertificatesUrl: string = 'assets/data/certificates/certificates.json';
  private ForSoulUrl: string = 'assets/data/sliders/for-soul-slider.json';

  constructor(private getSlidesService: GetSlidesService) { }

  ngOnInit(): void {
    //loading slides info for categories slider
    this.getSlidesService.getSlides(this.CategorySlidesUrl).subscribe(data => {
      this.slides = data;
      console.log('Loaded slides:', this.slides);
    });
    //loading slides info for made with love slider
    this.getSlidesService.getProducts(this.WithLoveSlidesUrl).subscribe(data => {
      this.slides_love = data;
      console.log('Loaded slides:', this.slides_love);
    });
    //loading slides info for for soul slider
    this.getSlidesService.getProducts(this.ForSoulUrl).subscribe(data => {
      this.slides_soul = data;
      console.log('Loaded slides:', this.slides_soul);
    });
    //loading gift certificates
    this.getSlidesService.getCertificates(this.CertificatesUrl).subscribe(data => {
      this.gift_certificates = data;
      console.log('Loaded slides:', this.gift_certificates);
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 5,
    stagePadding: 50,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }
  customOptionsLove: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 5,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      580: {
        items: 2
      },
      777: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  customOptionsSoul: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 5,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      580: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

}
