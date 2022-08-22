import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { showAnimation } from './animation/animation';
import { PopupService } from './component/popup/popup.service';
import { RowData } from './interface/interface';
import { EditPopupComponent } from './popup/edit-popup/edit-popup.component';
import { ApiService } from './service/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [showAnimation],
})
export class AppComponent implements OnInit {
  addForm = this.formBuilder.group({
    description: ['', [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  rowData: TData[] = [];
  processing: boolean = false;
  sortColumn?: 'asc' | 'desc' = 'asc';
  openSearch: boolean = false;
  search: string = '';

  get showDelete(): boolean {
    return !!this.rowData.find((item) => item.checked);
  }

  get isCheckedAll(): boolean {
    return this.rowData.length > 0 && !this.rowData.find((item) => !item.checked);
  }

  ngOnInit(): void {
  }

  checkAll(checked: boolean) {
    this.rowData = this.rowData.map((item) => ({
      ...item,
      checked
    }));
  }

  addRow() {
    if (!this.processing && this.addForm.valid) {
      this.processing = true;
      this.apiService.addRow(this.addForm.value.description!)
        .pipe(
          map(item => this.mapList(item))
        )
        .subscribe((rowData) => {
          this.processing = false;
          this.rowData = rowData;
          this.addForm.reset();
        });
    }
  }

  showEditPopup(item: TData) {
    this.popupService.open(
      this.viewContainerRef,
      EditPopupComponent,
      {
        rowData: item,
        finish: () => this.getRowData()
      }
    );
  }

  getRowData(sortColumn?: 'asc' | 'desc') {
    if (sortColumn) {
      this.sortColumn = sortColumn === 'desc' ? 'asc' : 'desc';
    }
    this.apiService.getRowData()
      .pipe(
        map(item => this.mapList(item))
      )
      .subscribe((rowData) => {
        this.rowData = rowData.filter(item => item.description.indexOf(this.search) >= 0);
        this.rowData.sort((a, b) => this.sort(a, b, this.sortColumn === 'asc'))
      });
  }

  private sort(a: TData, b: TData, isAsc: boolean = false) {
    return isAsc
      ? (a.time < b.time) ? -1 : 1
      : (a.time < b.time) ? 1 : -1
  }

  select(data: TData, checked: boolean) {
    this.rowData = this.rowData.map((item) => ({
      ...item,
      checked: (data.id === item.id) ? checked : item.checked,
    }));
  }

  deleteItem(id: number) {
    this.apiService.deleteById(id)
      .pipe(
        map(item => this.mapList(item))
      )
      .subscribe((rowData) => {
        this.rowData = rowData;
      });
  }

  changeStatus(item: TData, isCompleted: boolean) {
    this.apiService.setCompletedById(item.id, isCompleted)
      .pipe(
        map(item => this.mapList(item))
      )
      .subscribe((rowData) => {
        this.rowData = rowData;
      });
  }

  private mapList(rowData: RowData[]): TData[] {
    return rowData.map((item): TData => ({
      checked: false,
      description: item.description,
      isCompleted: item.isCompleted,
      time: item.time!,
      id: item.id!,
    }));
  }

  closeSearch() {
    if (this.openSearch && !this.search) {
      this.openSearch = false;
    }
  }
}

interface TData {
  checked: boolean;
  description: string;
  isCompleted: boolean;
  time: string;
  id: number;
}
