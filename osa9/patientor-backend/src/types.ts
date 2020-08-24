export enum Gender {
    male,
    female,
    other,
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;