import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Popup, PopupSetting } from 'src/app/component/popup/popup';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss']
})
export class EditPopupComponent implements OnInit, Popup {
  @Input() data: {
    finish: () => void,
    rowData?: {
      checked: boolean;
      description: string;
      isCompleted: boolean;
      id: number;
    }
  } & PopupSetting = {
      finish: () => { },
      close: () => { }
    };
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  content: string = '';
  errorMessage: string = '';
  isProcessing: boolean = false;
  form = this.formBuilder.group({
    description: ['', [Validators.required]],
    isCompleted: [false]
  });

  ngOnInit(): void {
    if (this.data.rowData) {
      this.form.patchValue({
        description: this.data.rowData.description,
        isCompleted: this.data.rowData.isCompleted,
      });
    }
  }

  editRow() {
    if (this.form.valid && this.data.rowData) {
      this.isProcessing = true;
      this.apiService.edit(this.data.rowData.id, this.form.value.description!, this.form.value.isCompleted!)
        .subscribe(() => {
          this.finish();
        })
    }
  }

  private finish() {
    this.data.close!();
    this.data.finish();
  }

  close() {
    if (this.data?.close) {
      this.data.close();
    }
  }
}
