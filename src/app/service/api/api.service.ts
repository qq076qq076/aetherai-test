import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { RowData, RowKey } from 'src/app/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  private mockData: RowData[] = [];

  getRowData(): Observable<RowData[]> {
    return of(this.mockData.filter((item) => !item.isDelete))
      .pipe(
        map((res): RowData[] =>
          res.map((item: any): RowData => ({
            description: item.description || '',
            isDelete: item.isDelete,
            isCompleted: item.isCompleted,
            time: item.time,
            id: item.id,
          }))
        )
      );
  }

  addRow(description: string): Observable<RowData[]> {
    const date = new Date();
    const data = {
      description,
      isDelete: false,
      isCompleted: false,
      id: this.mockData.length,
      time: date.toISOString(),
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
