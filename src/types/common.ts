// src/types/common.ts
export type ID = string;

export type StringMap = Record<string, string>;

export interface ChartDatum {
  name: string;
  value: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface ApiListResult<T> {
  items: T[];
  total: number;
}

export interface PagedQuery {
  page?: number;
  pageSize?: number;
  search?: string;
}

export type InputChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

export type Click = React.MouseEvent<HTMLButtonElement>;
