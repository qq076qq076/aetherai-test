import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  constructor() { }
  onChange?: (value: boolean) => void;
  onTouched?: (value: boolean) => void;
  checked: boolean = false;

  @HostListener('click', ['$event']) click(e: MouseEvent) {
    if (this.onChange) {
      console.log(!this.checked)
      this.onChange(!this.checked);
    }
  }

  ngOnInit(): void {
  }
  writeValue(value: boolean): void {
    console.log(value)
    this.checked = value;
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (value: boolean) => void): void {
    this.onTouched = fn;
  }
}
