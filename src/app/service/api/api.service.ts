import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { RowData, RowKey } from 'src/app/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  private mockData: RowData[] = [];
  private sortColumn: RowKey = 'id';

  getRowData(sortColumn: RowKey = this.sortColumn): Observable<RowData[]> {
    const desc = this.sortColumn === sortColumn;
    const data = this.mockData.filter((item) => !item.isDelete)
      .sort((a, b) => {
        if (desc) {
          return a[sortColumn]! > b[sortColumn]! ? 0 : 1
        } else {
          return a[sortColumn]! < b[sortColumn]! ? 0 : 1
        }
      })
    this.sortColumn = sortColumn;
    return of(data)
      .pipe(
        map((res): RowData[] =>
          res.map((item: any): RowData => ({
            description: item.description || '',
            isDelete: item.isDelete,
            isCompleted: item.isCompleted,
            id: item.id,
          }))
        )
      );
  }

  addRow(description: string): Observable<RowData[]> {
    const data = {
      description,
      isDelete: false,
      isCompleted: false,
      id: this.mockData.length,
    };
    this.mockData.push(data);
    return this.getRowData()
      .pipe(
        delay(500),
      );
  }

  deleteById(id: number) {
    this.mockData = this.mockData.filter((item) => item.id !== id);
    return this.getRowData()
      .pipe(
        delay(500),
      );
  }

  setCompletedById(id: number, isCompleted: boolean) {
    this.mockData = this.mockData.map((item) => {
      return (item.id === id)
        ? {
          ...item,
          isCompleted
        }
        : item;
    });
    return this.getRowData()
      .pipe(
        delay(500),
      );
  }

  edit(id: number, description: string, isCompleted: boolean) {
    this.mockData = this.mockData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          description,
          isCompleted,
        }
      };
      return item;
    });
    return this.getRowData()
      .pipe(
        delay(500),
      );
  }
}
