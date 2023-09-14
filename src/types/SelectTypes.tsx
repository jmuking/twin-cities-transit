export enum SelectType {
  ROUTE = "route",
  DIRECTION = "direction",
  STOP = "stop",
}

export interface RequestParams {
  route?: string;
  direction?: string;
}

export interface TransitSelectParams {
  type: SelectType;
  requestParams?: RequestParams;
  selected?: string;
  selectChanged?: (value: string) => void;
}

export interface Option {
  label: string;
  value: string;
}
