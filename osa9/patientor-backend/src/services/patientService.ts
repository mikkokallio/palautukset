import patientData from '../../data/patients.json'
import { NewPatient, Patient, NonSensitivePatientEntry } from '../types';
import toNewPatient from "../utils";

//const patients: Patient[] = patientData;
const patients: Patient[] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient
    object.id = obj.id
    return object
});

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
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

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};