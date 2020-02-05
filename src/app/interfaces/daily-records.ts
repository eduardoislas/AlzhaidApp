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
export interface RootDailyDesempeno{
  success: boolean;
  cuantos: number;
  dps: Dp[];
}
export interface RootDailyProgram{
  success: boolean;
  cuantos: number;
  dps: Dp;
}

export interface Dp {
  activities: Activity;
  _id: string;
  date: string;
  phase: string;
  __v: number;
}

export interface Activity {
  attention: Info[];
  calculus: Info[];
  sensory: Info[];
  language: Info[];
  memory: Info[];
  reminiscence: Info[];
}

export interface Info {
  _id?: string;
  name: string;
  classification: string;
}

export interface InfoHygiene {
  _id?: string;
  name: string;
  time: string;
  observation: string;
}


