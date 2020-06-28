import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => (
  <div>find countries <input
    value={props.filter}
    onChange={props.handler}
  /></div>
)

const Hits = (props) => {
  return (
    <div>
      {props.callback().map(country =>
        <div key={country.name}><p >{country.name}</p>
          <button onClick={() => props.clicked(country)}>show</button>
        </div>
      )}
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
        console.log(response.data.current)
      })
  }

  useEffect(hook, [])
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>pop: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} width='100px' border='1pt' />
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.temperature} C</p>
      {weather.weather_icons !== undefined ? <img src={weather.weather_icons[0]}/> : ''}
      <p>wind: {weather.wind_speed} MPH {weather.wind_dir}</p>
    </div>
  )
}

// 

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterNames = () => {
    if (filter === '') return []
    const list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (list.length === 0) return [{ name: 'No entries found' }]
    if (list.length > 10) return [{ name: 'Too many matches, change your search terms' }]
    if (list.length === 1) setSelectedCountry(list[0])
    return list
  }
  return (
    <div>
      <h2>Country information</h2>
      <Filter
        filter={filter}
        handler={handleFilterChange}
      />
      <Hits callback={filterNames} clicked={setSelectedCountry} />
      {selectedCountry.name !== undefined
        ? <Country country={selectedCountry} />
        : ''}
    </div>
  )
}

export default App