import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SlideType} from "../../../types/slide.type";
import {ProductType} from "../../../types/product.type";
import {GiftCertificateType} from "../../../types/gift-certificate.type";
import {CategoriesType} from "../../../types/categories.type";

@Injectable({
  providedIn: 'root'
})
export class GetSlidesService {

  constructor(private http: HttpClient) {}

  getSlides(slidesUrl: string): Observable<SlideType[] > {
    return this.http.get<SlideType[]>(slidesUrl);
  }

  getProducts(slidesUrl: string): Observable<ProductType[] > {
    return this.http.get<ProductType[]>(slidesUrl);
  }

  getCertificates(certificatesUrl: string): Observable<GiftCertificateType[] > {
    return this.http.get<GiftCertificateType[]>(certificatesUrl);
  }

  getCategories(categoriesUrl: string): Observable<CategoriesType[] > {
    return this.http.get<CategoriesType[]>(categoriesUrl);
  }
}
