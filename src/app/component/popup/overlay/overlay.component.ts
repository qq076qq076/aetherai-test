import {
  Component, HostBinding, ElementRef,
  Type, Output, EventEmitter, ViewChild, EmbeddedViewRef,
  ComponentRef, OnDestroy, ChangeDetectionStrategy, ViewContainerRef
} from '@angular/core';
import { Popup, PopupSetting } from '../popup';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

const fadeInDown =
  trigger('fadeInDown', [
    transition('void => *', [
      animate('.2s cubic-bezier(0.22, 0.73, 1, 1)', keyframes([
        style({ opacity: 0, transform: 'translateY(-10px)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
      ]))
    ]),
    transition('* => void', [
      animate('.2s cubic-bezier(0.22, 0.73, 1, 1)', keyframes([
        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
        style({ opacity: 0, transform: 'translateY(10px)', offset: 1 })
      ]))
    ])
  ]);

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInDown]
})
export class OverlayComponent implements OnDestroy {
  @HostBinding('@fadeInDown') fadeInDown?: any;
  @ViewChild('content', { static: true }) content?: ElementRef<any>;
  @Output() popupClose = new EventEmitter();
  public injectComponentRef?: ComponentRef<Popup>;
  style: any;
  iconStyle: any;
  noPadding: boolean = false;
  transparentMode: boolean = false;

  constructor(
    public elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnDestroy(): void {
    // 觸發內層建立元件的destroy
    this.injectComponentRef?.destroy();
  }

  // 建立外面傳送的元件
  createComponent(component: Type<Popup>, data: PopupSetting) {
    // 建立元件
    this.injectComponentRef = this.viewContainerRef.createComponent(component);
    // 將外層data傳送到元件data
    this.injectComponentRef.instance.data = data;
    // 設定 OverlayComponent 相關樣式
    // this.transparentMode = !!data.transparentMode;
    // 更新OverlayComponent相關
    this.updatePopup(data.style);
    const { rootNodes } = this.injectComponentRef.hostView as EmbeddedViewRef<any>;
    const safeRootNodes = this.sanitizer.bypassSecurityTrustHtml(rootNodes[0]);
    // 將建立的元件加到overlay
    this.content?.nativeElement.appendChild((safeRootNodes as any)['changingThisBreaksApplicationSecurity']);
  }

  // 更新OverlayComponent
  updatePopup(
    style?: { [key: string]: string },
  ) {
    if (style) {
      this.style = style;
    }
  }
  // 觸發上層close事件
  close() {
    this.injectComponentRef?.instance.close();
  }

}
