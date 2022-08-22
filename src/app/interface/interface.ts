export interface RowData {
  description: string;
  isDelete: boolean;
  isCompleted: boolean;
  id?: number;
}

export type RowKey = keyof RowData;
