export interface RootPatient {
    success: boolean;
    patients: Patient[];
    count: number;
}
  
export interface Patient {
    img?: string;
    _id: string;
    name: string;
    lastName: string;
    lastNameSecond?: string;
    birthdate: string;
    registerdate?: string;
    phase: Phase;
    phaseHistory: PhaseHistory[];
}
  
export interface PhaseHistory {
    status: boolean;
    _id: string;
    phase: string;
    date: string;
}
  
export interface Phase {
    _id: string;
    name: string;
}