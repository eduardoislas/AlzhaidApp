export interface RootNotification {
    success: boolean;
    vigentes: Vigente[];
  }

export   interface Vigente {
    high_priority: boolean;
    area: string[];
    _id: string;
    date: Date;
    expiration_date: Date;
    description: string;
    type: Type;
    patient: Patient;
    user: string;
    unsubscribedUsers: string[];
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

export interface RootNotification {
  success: boolean;
  respuestas: [];
}