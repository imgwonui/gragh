export interface DataPoint {
  id: string;
  name: string;
  value: number;
  innerValue?: number;
}

export interface ChartData {
  id: string;
  title: string;
  data: DataPoint[];
  type: 'bar' | 'line' | 'pie' | 'area';
}