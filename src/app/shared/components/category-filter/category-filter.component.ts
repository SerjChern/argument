import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoriesType} from "../../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() category: CategoriesType | null = null;
  @Output() selectionChange = new EventEmitter<{ categoryId: number, selected: string[] }>();
  @Output() filterChange = new EventEmitter<{ categoryId: string, sub: string, checked: boolean }>();

  protected open: boolean = false;
  private selected: string[] = [];
  selectedSubs: string[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const subs = params['sub'] ? params['sub'].split(',') : [];
      const categoryIds = params['categoryId'] ? params['categoryId'].split(',') : [];

      if (this.category && categoryIds.includes(this.category.id.toString())) {
        this.selectedSubs = subs.filter((sub: string) =>
            this.category?.subCategories.some(sc => sc.name === sub)
        );
      } else {
        this.selectedSubs = [];
      }

      // 👉 если в фильтре есть выбранные чекбоксы — раскрываем
      this.open = this.selectedSubs.length > 0;
    });
  }

  toggle() {
    this.open = !this.open;
  }

  onCheckboxChange(sub: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedSubs.push(sub);
    } else {
      this.selectedSubs = this.selectedSubs.filter(s => s !== sub);
    }

    const currentParams = {...this.route.snapshot.queryParams};

    let categoryIds: string[] = currentParams['categoryId']
        ? currentParams['categoryId'].split(',')
        : [];

    if (this.category) {
      if (checked) {
        if (!categoryIds.includes(this.category.id.toString())) {
          categoryIds.push(this.category.id.toString());
        }
      } else {
        if (this.selectedSubs.length === 0) {
          categoryIds = categoryIds.filter(id => id !== this.category?.id.toString());
        }
      }
    }

    let subs: string[] = currentParams['sub']
        ? currentParams['sub'].split(',')
        : [];

    if (checked) {
      if (!subs.includes(sub)) {
        subs.push(sub);
      }
    } else {
      subs = subs.filter(s => s !== sub);
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        categoryId: categoryIds.length > 0 ? categoryIds.join(',') : null,
        sub: subs.length > 0 ? subs.join(',') : null
      }
    });
  }

}
