export interface RootNotification {
    success: boolean;
    vigentes: Vigente[];
  }

export   interface Vigente {
    high_priority: boolean;
    area: string[];
    _id: string;
    date: string;
    expiration_date: string;
    description: string;
    type: Type;
    patient: Patient;
    user: Type;
  }

export   interface Patient {
    _id: string;
    name: string;
    lastName: string;
    lastNameSecond: string;
  }

export   interface Type {
    _id: string;
    name: string;
  }