export interface IRoute {
  name?: string;
  contract: string;
  color: string;
  startStation: {
    number: number;
    data?: any;
  }
  endStation: {
    number: number;
    data?: any;
  }
}
