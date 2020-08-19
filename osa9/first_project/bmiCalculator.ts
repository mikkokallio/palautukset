const categories = [
  { title: 'Very severely underweight', min: 0, max: 15 },
  { title: 'Severely underweight', min: 15, max: 16 },
  { title: 'Underweight', min: 16, max: 18.5 },
  { title: 'Normal (healthy weight)', min: 18.5, max: 25 },
  { title: 'Overweight', min: 25, max: 30 },
  { title: 'Moderately obeset', min: 30, max: 35 },
  { title: 'Severely obese', min: 35, max: 40 },
  { title: 'Very severely obese', min: 40, max: 100 },
]

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <=0) throw new Error('Height and weight must be positive numbers!')

  const bmi = weight / Math.pow(height / 100, 2)
  for (let cat of categories) {
    if (cat.min < bmi && bmi < cat.max) {
      return cat.title
    }
  }
  throw new Error('Invalid parameters!')
}

console.log(process.argv)

try {
  console.log(calculateBmi(parseFloat(process.argv[2]), parseFloat(process.argv[3])))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message)
}
