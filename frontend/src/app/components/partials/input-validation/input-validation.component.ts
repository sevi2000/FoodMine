import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required : 'Should not be empty',
  email: 'Email is not valid'
}
@Component({
  selector: 'input-validation',
  imports: [],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  checkValidation(): void {
    const errors: ValidationErrors | null = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys: string[] = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
