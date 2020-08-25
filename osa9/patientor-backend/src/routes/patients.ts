import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  const patients = patientService.getEntries();
  console.log(patients);
  res.send(patients.filter(p => p.id === req.params.id))
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedEntry = patientService.addEntry(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

export default router;