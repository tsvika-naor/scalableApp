import { Component, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Output() changed = new EventEmitter<string>();
  value: string;
  isDisabled: boolean;
  constructor() { }

  private propogateChange: any = () => { };
  private propogateTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propogateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(value: string): void {
    console.log(value)
    this.value = value;
    this.propogateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
  this.propogateTouched();
  }
  ngOnInit(): void {
  }

}
