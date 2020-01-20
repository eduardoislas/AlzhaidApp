// Daily Records
export interface RootDaily {
  success: boolean;
  cuantos: number;
  drs: Dr[];
}

export interface Dr {
  exit: boolean;
  _id: string;
  date: string;
  patient: Patient;
  vitalSigns: VitalSign[];
  __v: number;
  exitHour?: string;
  technicalSupport: any[];
  attitude: any[];
  behavior: any[];
  crisis: any[];
  hygiene: any[];
  meal: any[];
}

export interface VitalSign {
  vitalSign: string;
  date: string;
  value: number;
  valueB?: number;
}

export interface Patient {
  img: string;
  _id: string;
  name: string;
  lastName: string;
  lastNameSecond: string;
  phase: string;
}

// Daily Records desempeño
export interface RootDailyDesempeno {
  success: boolean;
  cuantos: number;
  dps: Dp[];
}

export interface Dp {
  _id: string;
  date: string;
  phase: string;
  activities: any[];
  __v: number;
}





