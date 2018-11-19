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
      formBody[spec.Name] = [null, spec.Required ? Validators.required : null];

      if (spec.AllowOpenText) {
        formBody[`${spec.Name}_openText`] = [null, null];
      }
    });

    this.specForm = this.formBuilder.group(formBody);
    this.originalForm = this.originalForm = { ...this.specForm.value };
    this.setDefaultValues();
  }

  private onFormChanges() {
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

  private setDefaultValues(): void {
    const specsWithDefaults = this.specs.Items.filter((s) => s.DefaultOptionID);
    if (specsWithDefaults.length) {
      specsWithDefaults.forEach((s) => {
        this.specForm.controls[s.Name].setValue(s.DefaultOptionID);
      });
    }
  }

  getDiff(changes) {
    // only interested in values that have changed
    const diff = {};
    _each(this.originalForm, (originalVal, originalKey) => {
      if (changes[originalKey] !== originalVal) {
        diff[originalKey] = changes[originalKey];
      }
    });
    return diff;
  }

  evaluateRequiredInputs(specFormName): void {
    const specName = specFormName.split('_')[0];
    const isSpecRequired = this.specs.Items.find((s) => s.Name === specName)
      .Required;
    //check if there is an open text input for this spec
    if (this.specForm.controls[`${specName}_openText`] && isSpecRequired) {
      const isOpenTextRequired =
        this.specForm.controls[specName].value === 'other';
      const isSelectionRequired =
        this.specForm.controls[`${specName}_openText`].value === null;
      //if the select option is 'other', set the open text input to required and remove validators from select input
      this.specForm.controls[
        `${specName}_openText`
      ].validator = isOpenTextRequired ? Validators.required : null;
      this.specForm.controls[specName].validator = isSelectionRequired
        ? Validators.required
        : null;
      //update the values and validators set here
      this.specForm.controls[`${specName}_openText`].updateValueAndValidity();
      this.specForm.controls[specName].updateValueAndValidity();
    } else {
      return;
    }
  }
}
