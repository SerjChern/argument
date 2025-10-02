import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {GetSlidesService} from "../../../shared/services/get-slides.service";
import {CategoriesType} from "../../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  protected ProductsUrl = 'assets/data/products/products.json';
  protected CategoryUrl = 'assets/data/products/categories.json';
  protected products: ProductType[] = [];
  protected categories: CategoriesType[] = [];
  protected filteredProducts: ProductType[] = [];
  protected filteredCategories: string[] = []; //array of filtered categories for filter elements above catalog
  protected pages: number[] = []; //отображаемые страницы
  private amountOfProductsPerPage: number = 3; // константа количество товаров на странице
  protected pageAmount: number = 0;

  protected sortingOpen: boolean = false;
  protected filtersActive: boolean = false;

  protected activeParams: any = {};
  protected sortingOptions: {name: string, value: string}[] = [
    {name: 'По возрастанию цены', value: 'price-asc'},
    {name: 'По убыванию цены', value: 'price-desc'},
  ];

  constructor(private GetSlidesService: GetSlidesService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {

    this.GetSlidesService.getProducts(this.ProductsUrl).subscribe(data => {
      this.products = data;
      this.route.queryParams.subscribe(params => {
        this.activeParams = { ...params }; // сохраняем текущие query-параметры

        // set default page if not defined
        if (!this.activeParams.page) {
          this.activeParams.page = 1;
        }

        this.applyFilters(params);
        this.filtersActive = this.hasQueryParams();

        // применяем сортировку, если есть
        if (params['sort']) {
          this.applySorting(params['sort']);
        }

        if (params['sub']) {
          this.filteredCategories = decodeURIComponent(params['sub']).split(',');
        } else {
          this.filteredCategories = [];
        }
      });

      // also update on query param changes
      this.route.queryParams.subscribe(params => {
        this.activeParams = { ...params };
        if (!this.activeParams.page) this.activeParams.page = 1;
      });

      this.GetSlidesService.getCategories(this.CategoryUrl).subscribe(data => {
        this.categories = data;
      });
    });
  }

  protected calculatePages(products: ProductType[]): number {
    if (products && products.length > 0) {
      console.log('lenght: ' + products.length);
      return Math.ceil(products.length / this.amountOfProductsPerPage);
    } else {
      return 1;
    }
  }

  protected hasQueryParams(): boolean {
    const params = this.route.snapshot.queryParams;
    return Object.keys(params).length > 0;
  }

  protected clearAllFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},          // completely reset query params
      replaceUrl: true          // optional: avoids adding a new entry in browser history
    });
  }

  private applyFilters(params: any) {
      const categoryIds = params['categoryId'] ? params['categoryId'].split(',') : [];
      const subs = params['sub'] ? params['sub'].split(',') : [];
    console.log(this.filteredCategories);
      this.filteredProducts = this.products.filter(product => {
        let match = true;

        // фильтр по categoryId (например id = "1")
        if (categoryIds.length > 0) {
          match = match && categoryIds.includes(product.id.toString());
        }

        // фильтр по sub (например category = "Свитеры")
        if (subs.length > 0) {
          match = match && subs.includes(product.category);
        }
        return match;
      });
      //Заполняем массив количества страниц
      this.pageAmount = this.calculatePages(this.filteredProducts);
      this.pages = [];
      for (let i=1; i <=this.pageAmount; i++) {
        this.pages.push(i);
      }
  }

 /* protected removeFilters(subToRemove: string): void {
    // убираем выбранный фильтр из массива
    this.filteredCategories = this.filteredCategories.filter(item => item !== subToRemove);

    if (this.filteredCategories.length > 0) {
      // если остались фильтры → обновляем queryParams
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          sub: this.filteredCategories.join(',')
        }
      });
    } else {
        // если фильтров больше нет → убираем sub из queryParams
        this.router.navigate([], {
          relativeTo: this.route,
          queryParamsHandling: 'merge',
          queryParams: { sub: null }
        });

      // если фильтров больше нет → редиректим на чистый /catalog
      this.router.navigate(['/catalog']);
    }
    console.log(this.filteredCategories)
  }*/

  protected removeFilters(subToRemove: string): void {
    this.filteredCategories = this.filteredCategories.filter(item => item !== subToRemove);

    if (this.filteredCategories.length > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          sub: this.filteredCategories.join(',')
        }
      });
    } else {
      // редиректим на чистый каталог
      this.router.navigate(['/catalog']);
    }

    console.log(this.filteredCategories);
  }

  protected sortingToggle(): void {
    this.sortingOpen = !this.sortingOpen;
  }

  protected sort(value: string): void {
    this.activeParams.sort = value;

    // навигация с обновлением queryParams
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: this.activeParams
    });

    // сортируем локально
    this.applySorting(value);
  }

  private applySorting(value: string): void {
    if (value === 'price-asc') {
      this.filteredProducts = [...this.filteredProducts].sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      this.filteredProducts = [...this.filteredProducts].sort((a, b) => b.price - a.price);
    }
  }

  protected openPage(page: number) {
    this.activeParams.page = page; // update immediately
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page --;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
    console.log(this.activeParams.page);
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page ++;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }
}
