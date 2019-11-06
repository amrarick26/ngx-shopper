// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from 'src/app/shared/shared-routing.module';

// 3rd party UI
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextMaskModule } from 'angular2-text-mask';

// ng-bootstrap modules
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbTabsetModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbAccordionModule,
  NgbModalModule,
  NgbCarouselModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

// pipes
import { OrderStatusDisplayPipe } from 'src/app/shared/pipes/order-status-display/order-status-display.pipe';
import { PaymentMethodDisplayPipe } from 'src/app/shared/pipes/payment-method-display/payment-method-display.pipe';

// directives
import { FallbackImageDirective } from './directives/fallback-image/fallback-image.directive';

// components
import { AddressFormComponent } from 'src/app/shared/components/address-form/address-form.component';
import { CreditCardFormComponent } from 'src/app/shared/components/credit-card-form/credit-card-form.component';
import { CreditCardIconComponent } from 'src/app/shared/components/credit-card-icon/credit-card-icon.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { PageTitleComponent } from 'src/app/shared/components/page-title/page-title.component';
import { AddressDisplayComponent } from 'src/app/shared/components/address-display/address-display.component';
import { CreditCardDisplayComponent } from 'src/app/shared/components/credit-card-display/credit-card-display.component';
import { LineItemCardComponent } from 'src/app/shared/components/line-item-card/line-item-card.component';
import { LineItemListWrapperComponent } from 'src/app/shared/components/lineitem-list-wrapper/lineitem-list-wrapper.component';

// containers
import {
  ShipperTrackingPipe,
  ShipperTrackingSupportedPipe,
} from 'src/app/shared/pipes/shipperTracking/shipperTracking.pipe';
import { QuantityInputComponent } from 'src/app/shared/components/quantity-input/quantity-input.component';
import { ToggleFavoriteComponent } from 'src/app/shared/components/toggle-favorite/toggle-favorite.component';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { ProductCarouselComponent } from 'src/app/shared/components/product-carousel/product-carousel.component';
import { MapToIterablePipe } from 'src/app/shared/pipes/map-to-iterable/map-to-iterable.pipe';
import { GenericBrowseComponent } from 'src/app/shared/components/generic-browse/generic-browse.component';
import {
  ModalComponent,
  ResetDirective,
} from 'src/app/shared/components/modal/modal.component';
import { OrderPaymentListComponent } from 'src/app/shared/components/payment-list/order-payment-list.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { PhoneFormatPipe } from './pipes/phone-format/phone-format.pipe';
import { PhoneInputDirective } from './directives/phone-input/phone-input.directive';

@NgModule({
  imports: [
    SharedRoutingModule,
    // angular
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    // 3rd party UI
    FontAwesomeModule,
    TextMaskModule,

    /**
     * ng-bootstrap modules
     * only those that are used by app
     * should be imported to reduce bundle size
     */
    NgbDatepickerModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbPaginationModule,
    NgbPopoverModule,
    NgbAccordionModule,
    NgbCarouselModule,
    NgbDropdownModule,
  ],
  exports: [
    // angular
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    // 3rd party UI
    FontAwesomeModule,
    TextMaskModule,

    NgbDatepickerModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbPaginationModule,
    NgbPopoverModule,
    NgbAccordionModule,
    NgbCarouselModule,
    NgbDropdownModule,

    NoResultsComponent,
    SearchComponent,
    PageTitleComponent,
    OrderStatusDisplayPipe,
    PaymentMethodDisplayPipe,
    MapToIterablePipe,
    CreditCardIconComponent,
    AddressDisplayComponent,
    CreditCardDisplayComponent,
    CreditCardFormComponent,
    LineItemListWrapperComponent,
    FallbackImageDirective,
    ResetDirective,
    LineItemCardComponent,
    ShipperTrackingPipe,
    ShipperTrackingSupportedPipe,
    AddressFormComponent,
    QuantityInputComponent,
    ToggleFavoriteComponent,
    ProductCardComponent,
    ProductCarouselComponent,
    GenericBrowseComponent,
    ModalComponent,
    OrderPaymentListComponent,
    MiniCartComponent,
    PhoneFormatPipe,
    PhoneInputDirective,
  ],
  declarations: [
    OrderStatusDisplayPipe,
    PaymentMethodDisplayPipe,
    MapToIterablePipe,
    PageTitleComponent,
    AddressDisplayComponent,
    CreditCardDisplayComponent,
    CreditCardFormComponent,
    FallbackImageDirective,
    ResetDirective,
    SearchComponent,
    CreditCardIconComponent,
    LineItemCardComponent,
    ShipperTrackingPipe,
    ShipperTrackingSupportedPipe,
    AddressFormComponent,
    LineItemListWrapperComponent,
    QuantityInputComponent,
    MiniCartComponent,
    ToggleFavoriteComponent,
    ProductCardComponent,
    ProductCarouselComponent,
    GenericBrowseComponent,
    ModalComponent,
    OrderPaymentListComponent,
    NoResultsComponent,
    PhoneFormatPipe,
    PhoneInputDirective,
  ],
})
export class SharedModule {}