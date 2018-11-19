import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ListBuyerSpec } from '@ordercloud/angular-sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { each as _each } from 'lodash';

@Component({
  selector: 'product-specs',
  templateUrl: './product-specs.component.html',
  styleUrls: ['./product-specs.component.scss'],
})
export class ProductSpecsComponent implements OnInit {
  @Input() specs: ListBuyerSpec;
  @Output()
  specFormChanges = new EventEmitter<{ formValues: {}; isValid: boolean }>();

  alive = true;
  specForm: FormGroup;
  originalForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setForm();
    this.onFormChanges();
  }

  private setForm(): void {
    const formBody = {};

    this.specs.Items.forEach((spec) => {
      formBody[spec.Name] = [
        spec.DefaultOptionID || null,
        spec.Required ? Validators.required : null,
      ];

      if (spec.AllowOpenText) {
        formBody[`${spec.Name}_openText`] = [null, null];
      }
    });

    this.specForm = this.formBuilder.group(formBody);
    this.originalForm = this.specForm;
  }

  private onFormChanges() {
    /**
     * TODO: write an onChanges function to re-evaluate what input is required when
     * 1. Spec is required
     * 2. Allow open text true
     */
    this.specForm.valueChanges
      .pipe(takeWhile(() => this.alive))
      .subscribe((changes) => {
        const diffed = this.getDiff(changes);
        this.originalForm = changes;
        this.specFormChanges.emit({
          formValues: diffed,
          isValid: this.specForm.valid,
        });
      });
  }

  getDiff(changes) {
    // only interested in values that have changed
    const diff = {};
    _each(this.originalForm, (originalVal, originalKey) => {
      if (changes[originalKey] !== originalVal) {
        diff[originalKey] = changes[originalKey];
      }
      // if (originalKey) {
      //   const specName = originalKey.slice(0, originalKey.indexOf('_openText'));
      // }
    });
    return diff;
  }

  private evaluateRequiredInputs() {}
}
