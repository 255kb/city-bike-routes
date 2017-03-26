export interface IRoute {
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
