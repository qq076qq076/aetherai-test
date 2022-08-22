import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() error: boolean = false;

  @Output() blur = new EventEmitter();
  myValue: any;
  onChange: any;
  onTouched: any;

  focus = false;
  constructor() { }

  get value() {
    return this.myValue;
  }

  set value(value: string) {
    this.myValue = value;
    this.notifyValueChange();
  }

  ngOnInit(): void {
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.myValue);
    }
    if (this.onTouched) {
      this.onTouched(null);
    }
  }

  writeValue(value: any): void {
    this.myValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
