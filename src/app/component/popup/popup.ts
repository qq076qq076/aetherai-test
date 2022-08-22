export interface PopupSetting {
  style?: any;
  close?: (data?: any) => void;
  updatePopup?: (title?: string, style?: any) => void;
  [propname: string]: any;
}

export interface Popup {
  close: (data?: any) => void;
  data: any;
}
