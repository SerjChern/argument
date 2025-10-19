import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'count-selector',
  templateUrl: './count-selector.component.html',
  styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent implements OnInit {

  @Input() count: number = 1;
  @Output() onCountChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  protected countChange() {
    this.count = Number(this.checkCounterBounds(1, 10, this.count)); // ensure numeric
    this.onCountChange.emit(this.count);
  }

  protected decreaseCount() {
    if (this.count > 1) {
      this.count--;
      this.countChange();
    }
  }

  protected increaseCount() {
    this.count++;
    this.countChange();
  }

  private checkCounterBounds(min: number, max: number, value: number): number {
    if (value <= min) {
      value = min;
      return value
    } else if (value >= max) {
      value = max;
      return value;
    } else {
      return value;
    }
  }

}
