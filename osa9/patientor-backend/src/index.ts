import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients'
import diagnosisRouter from './routes/diagnoses'

const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter)
app.use('/api/diagnoses', diagnosisRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*

9.13: Patientor backend, step6
Set up safe parsing, validation and type guards to the POST /api/patients request.

Refactor the Gender field to use an enum type.
*/