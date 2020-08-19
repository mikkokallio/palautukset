interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const ratings = [
  { title: 'Underwhelming', min: 0, max: 0.95 },
  { title: 'Ok', min: 0.95, max: 1.2 },
  { title: 'Great', min: 1.2, max: 100 },
]

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments')
  //if (args.length > 4) throw new Error('Too many arguments')
  let arr = []
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error ('Provided values were not numbers!')
    arr.push(Number(args[i]))
  }
  return arr
}

const getRating = (result: number): string => {
  for (let rating of ratings) {
    if (rating.min < result && result < rating.max) {
      return rating.title
    }
  }
  throw new Error('Error with input!')
}

export const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  if (target <= 0) throw new Error('Target must be a positive number!')

  const sum = dailyHours.reduce((a, b) => a + b)
  const avg = sum / dailyHours.length

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(d => d>0).length,
    success: avg >= target,
    rating: 1 + avg / target,
    ratingDescription: getRating(avg / target),
    target: target,
    average: avg
  }
}

console.log(process.argv)

try {
  const arr = parseArguments(process.argv)
  console.log(calculateExercises(arr.slice(1), arr[0]))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message)
}