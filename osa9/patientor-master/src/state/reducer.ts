import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export const setPatientList = (patients: Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST' as const,
    payload: patients
  }
}

export const addPatient = (patient: Patient) => {
  return {
    type: 'ADD_PATIENT' as const,
    payload: patient
  }
}

export const addPatientInfo = (patient: Patient) => {
  return {
    type: 'ADD_PATIENT_INFO' as const,
    payload: patient
  }
}

export const setDiagnoses = (diagnoses: Diagnosis[]) => {
  return {
    type: 'SET_DIAGNOSES' as const,
    payload: diagnoses
  }
}

export const addEntry = (patient: Patient, id: string) => {
  return {
    type: 'ADD_ENTRY' as const,
    payload: patient,
    id: id
  }
}

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT_INFO";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
    id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_INFO":
      return {
        ...state,
        patients_full: {
          ...state.patients_full,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {...state.patients,
          [action.id]: action.payload
        }
      }
    default:
      return state;
  }
};