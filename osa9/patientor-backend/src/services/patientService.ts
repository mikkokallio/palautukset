import patientData from '../../data/patients'
import { NewPatient, Patient, NonSensitivePatientEntry, NewHealthCheckEntry, NewOccupationalEntry, NewHospitalEntry, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from '../types';
import toNewPatient from "../utils";

const patients: Patient[] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient
    object.id = obj.id
    return object
});

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getEntries = (): Patient[] => {
    return patients;
};

const addEntry = (entry: NewPatient): Patient => {
    let rid: string = Math.random().toString(36).substring(7);
    const newPatient = {
        id: `d${rid}-f723-11e9-8f0b-362b9e155667`,
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const addPatientEntry = (entry: NewHealthCheckEntry | NewOccupationalEntry | NewHospitalEntry, id: string): HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry => {
    let rid: string = Math.random().toString(36).substring(7);
    const newEntry = {
        id: `d${rid}-f723-11e9-8f0b-362b9e155667`,
        ...entry
    };
    patients.map(p => p.id === id ? p.entries.push(newEntry) : p);
    return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    addPatientEntry
};