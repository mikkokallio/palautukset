import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom"

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
          console.log('fteched: ', patientFromApi);
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
        </Container>)}
    </div>
  );
};

export default PatientPage;
