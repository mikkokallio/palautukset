export enum Gender {
    male,
    female,
    other,
}

export interface Entry {
    text: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;