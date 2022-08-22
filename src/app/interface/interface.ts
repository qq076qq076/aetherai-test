export interface RowData {
  description: string;
  isDelete: boolean;
  isCompleted: boolean;
  time?: string;
  id?: number;
}

export type RowKey = keyof RowData;
