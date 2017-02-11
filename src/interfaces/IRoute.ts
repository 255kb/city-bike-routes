export interface IRoute {
  contract: string;
  startStation: {
    number: number;
    data?: any;
  }
  endStation: {
    number: number;
    data?: any;
  }
}
