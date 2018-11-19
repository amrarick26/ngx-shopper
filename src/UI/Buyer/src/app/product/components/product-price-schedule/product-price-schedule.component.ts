import { Component, Input } from '@angular/core';
import { Product } from '@ordercloud/angular-sdk';

@Component({
  selector: 'product-price-schedule',
  templateUrl: './product-price-schedule.component.html',
  styleUrls: ['./product-price-schedule.component.scss'],
})
export class ProductPriceScheduleComponent {
  @Input() product?: Product;
}
