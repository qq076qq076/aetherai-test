import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputComponent } from './component/input/input.component';
import { ButtonComponent } from './component/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { PopupWindowModule } from './component/popup/popup-window.module';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { EditPopupComponent } from './popup/edit-popup/edit-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    EditPopupComponent,
    CheckboxComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    PopupWindowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
