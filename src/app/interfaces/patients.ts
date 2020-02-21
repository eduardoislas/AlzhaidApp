export interface RootPatient {
    success: boolean;
    patients: Patient[];
    count: number;
}

export interface RPatient {
    success: boolean;
    patient: Patient;
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
    diagnosis: Diagnosis[];
    allergies: Allergy[];
    medicines: any[];
    physicalLimitations: PhysicalLimitations[];
    assistance: boolean;
}

export interface Allergy {
    _id: string;
    name: string;
}

export interface Diagnosis {
    status: boolean;
    name: string;
}

export interface PhysicalLimitations {
    status: boolean;
    name: string;
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
