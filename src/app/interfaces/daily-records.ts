export interface RootDaily {
    success: boolean;
    drs: Dr[];
    cuantos: number;
  }
  
export interface Dr {
    _id: string;
    date: string;
    patient?: any;
    exitHour: string;
}