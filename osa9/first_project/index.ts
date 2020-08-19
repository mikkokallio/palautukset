import express from 'express'
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()

app.use(bodyParser.json());

app.post('/exercise', (req, res) => {
    try {
        console.log('Got body:', req.body)
        for (let exercise of req.body.daily_exercises) {
            if (isNaN(Number(exercise))) throw new Error('Provided values were not numbers!')
        }
        if (isNaN(Number(req.body.target))) throw new Error('Provided values were not numbers!')
        const result = calculateExercises(req.body.daily_exercises, req.body.target)
        res.send(result)
    } catch (e) {
        res.status(400)
        res.send({
            error: "malformatted parameters"
        })
    }
})

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    try {
        const weight: number = Number(req.query.weight)
        const height: number = Number(req.query.height)
        const bmi = calculateBmi(height, weight)
        res.send({ weight: weight, height: height, bmi: bmi })
    } catch (e) {
        res.status(400)
        res.send({
            error: "malformatted parameters"
        })
    }
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

/*
9.7 WebExercises

If the body of the request is not of the right form, response with proper status code and error message is given. The error message is either

{
  error: "parameters missing"
}
or

{
  error: "malformatted parameters"
}
depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertable to numbers.

In this exercise you might find it beneficial to use the explicit any type when handling the data in the request body. Our eslint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Note that you need to have a correct setup in order to get hold to the request body, see part 3.
*/