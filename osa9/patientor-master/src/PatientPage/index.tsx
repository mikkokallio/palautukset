import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient, Diagnosis, Entry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import '../App.css';


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ patients_full, diagnoses }, dispatch] = useStateValue();

  const nameIfExists = (c: string) => {
    const obj = Object.values(diagnoses).find(d => d.code === c);
    if (obj === undefined) return undefined;
    return obj.name ? obj.name : '';
  }

  switch (entry.type) {
    case "Hospital":
        return (
          <Container textAlign="left" className="cont">
            <div>
              <p><b>{entry.date}: Hospital Visit</b></p>
              <p>{entry.description}</p>
              {entry.discharge? <p>Dischage data: {entry.discharge.date} Criteria: {entry.discharge.criteria}</p> : null}
              <ul>{entry.diagnosisCodes ? entry.diagnosisCodes.map(c => (
                <li>{c} {nameIfExists(c)}</li>
              )) : null}
              </ul>
            </div>
          </Container>)
      case "OccupationalHealthcare":
        return (
          <Container textAlign="left" className="cont">
            <div>
              <p><b>{entry.date}: Occupational Healthcare visit - {entry.employerName}</b></p>
              <p>{entry.description}</p>
              {entry.sickLeave? <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.startDate}</p> : null}
              <ul>{entry.diagnosisCodes ? entry.diagnosisCodes.map(c => (
                <li>{c} {nameIfExists(c)}</li>
              )) : null}
              </ul>
            </div>
          </Container>)
      case "HealthCheck":
      return (
        <Container textAlign="left" className="cont">
          <div>
            <p><b>{entry.date}: Regular health check</b></p>
            <p>{entry.description}</p>
            <ul>{entry.diagnosisCodes ? entry.diagnosisCodes.map(c => (
              <li>{c} {nameIfExists(c)}</li>
            )) : null}
            </ul>
          </div>
        </Container>)
    default:
      return assertNever(entry);
  }
}

const PatientPage: React.FC = () => {
  const [{ patients_full }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (patients_full[id] === undefined) {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "ADD_PATIENT_INFO", payload: Object.values(patientFromApi)[0] });
        } catch (e) {
          console.error(e);
        }
      };
    }
    fetchPatient();
  }, [dispatch]);

  const patient = Object.values(patients_full).find(p => p.id === id);

  return (
    <div className="App">
      {!patient ? (<p>loading...</p>) : (
        <Container textAlign="left">
          <h3>{patient.name} ({patient.gender})</h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h4>Entries</h4>
          {patient.entries.map(e => (<EntryDetails entry={e} />))}
        </Container>)}
    </div>
  );
};

export default PatientPage;
