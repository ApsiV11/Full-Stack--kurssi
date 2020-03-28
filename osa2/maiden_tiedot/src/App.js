import React, {useState, useEffect} from 'react';
import axios from 'axios'

const FindForm = ({handleChange}) => (
  <form>
        find countries <input id="input" onChange={handleChange}/>
  </form>
)

const Country = ({country, showF}) => (
  <div>
  <div> 
    {country.name}
    <button onClick={ () =>{
      showF(country)
    }
    }>show</button>
  </div>
  </div>
)

const CountryExtended = ({country}) => {
  const api_key=process.env.REACT_APP_API_KEY
  const [weather, setWeather]=useState({})

  useEffect(() => {
    console.log('effect')
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      const apiResponse=response.data.current
      setWeather({...apiResponse})
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
  <div>
    <h3>{country.name}</h3>
    <div>
      capital {country.capital}
    </div>
    <div>
      population {country.population}
    </div>

    <h3>Spoken languages</h3>
    <ul>
      {country.languages.map((language, i) => 
        <li key={i}>{language.name}</li>
      )}
    </ul>

    <img src={country.flag} alt="country flag" width="200" height="100"></img>

    <h3>Weather in {country.capital}</h3>
      <div>
        <b>temperature:</b>{` ${weather.temperature} Celsius`}
        <div>
          <img src={weather.weather_icons} />
        </div>
        <b>wind:</b>{` ${weather.wind_speed} mph direction ${weather.wind_dir}`}
      </div>
  </div>
)
}

const Countries = ({countries, showF}) => {
  if(countries.length>10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(countries.length>1){
    return (
      <div id="countries">
        {countries.map((country, i) => (
          <Country key={i} country={country} showF={showF} />
      ))}
      </div>
    )
  }
  else if(countries.length===1){
    return(
      <CountryExtended country={countries[0]} />
    )
  }
  else{
    return(
    <div>
      No matching countries found, specify another filter
    </div>
    )
  }
}

const App = () => {
  const [search, setSearch]=useState('')
  const [countries, setCountries]=useState([])

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (country) => {
    setSearch(country.name)
  }

  const showCountries=countries.filter(country =>(
      country.name.toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div>
    <FindForm handleChange={handleChange} />
    <Countries countries={showCountries} showF={handleShow} />
    </div>
  )
}

export default App;
