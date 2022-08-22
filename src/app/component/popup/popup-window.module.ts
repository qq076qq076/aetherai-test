import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay/overlay.component';
import { PopupService } from './popup.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OverlayComponent
  ],
  providers: [PopupService],
})
export class PopupWindowModule {
}
