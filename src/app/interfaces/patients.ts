export interface RootPatient {
    success: boolean;
    patients: Patient[];
    count: number;
}
  
export interface Patient {
    img?: string;
    status: boolean;
    _id: string;
    name: string;
    lastName: string;
    lastNameSecond?: string;
    birthdate: string;
    registerdate?: string;
    phase: string;
    phaseHistory: PhaseHistory[];
    __v: number;
    technicalSupport: TechnicalSupport[];
    diagnosis: any[];
    allergies: any[];
    medicines: any[];
    physicalLimitations: any[];
}

export interface TechnicalSupport {
    _id: string;
    name: string;
}
  
export interface PhaseHistory {
    status: boolean;
    _id: string;
    phase: string;
    date: string;
}