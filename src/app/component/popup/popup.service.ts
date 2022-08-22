import { Injectable, Type, ComponentRef, Inject, ViewContainerRef } from '@angular/core';
import { OverlayComponent } from './overlay/overlay.component';
import { PopupSetting } from './popup';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  private readonly overlayRefArr: ComponentRef<any>[] = [];

  // 關閉popup 觸發destroy
  close(componentRef: ComponentRef<any>) {
    this.overlayRefArr.splice(this.overlayRefArr.indexOf(componentRef), 1);
    componentRef.destroy();
  }

  // 建立OverlayComponent
  open(viewContainerRef: ViewContainerRef, component: Type<any>, data: PopupSetting) {
    const overlayRef = viewContainerRef.createComponent(OverlayComponent);
    this.overlayRefArr.push(overlayRef);
    // 將close updatePopup綁定到OverlayComponent元件的data
    data.close = data.close || this.close.bind(this, overlayRef);
    data.updatePopup = this.updatePopup.bind(this, overlayRef);
    overlayRef.instance.createComponent(component, data);
    const { nativeElement } = overlayRef.location;
    const safeHtml = (this.sanitizer.bypassSecurityTrustHtml(nativeElement) as any)['changingThisBreaksApplicationSecurity'];
    // 加到畫面上
    this.document.body.appendChild(safeHtml);

    return overlayRef;
  }
  // 觸發OverlayComponent來更新data
  updatePopup(componentRef: ComponentRef<OverlayComponent>, style?: any) {
    componentRef.instance.updatePopup(style);
  }

  closeAll(): void {
    for (let i = this.overlayRefArr.length - 1; i >= 0; i--) {
      this.close(this.overlayRefArr[i]);
    }
  }
}
