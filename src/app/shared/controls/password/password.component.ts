import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Output() changed = new EventEmitter<string>();
  
  value: string;
  isDisabled: boolean;
  passwordType: PasswordType;

  constructor() {
    this.passwordType = 'password';
  }

  private propogateChange: any = () => { };
  private propagateTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onKeyup(value: string): void {
    this.value = value;
    this.propogateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }


  togglePassword(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  ngOnInit(): void {
  }

}
