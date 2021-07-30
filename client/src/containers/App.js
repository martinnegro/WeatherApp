import React, { useState } from 'react';
import style from './App.module.css';

import { Route } from 'react-router-dom'

import Cards from '../components/Cards.jsx';
import Nav from '../components/Nav'
import About from '../components/About'
import City from '../components/City'

function App() {
  const [cities, setCities] = useState([]);

  function onSearch(city) {
    fetch(`https://server-weatherapp.herokuapp.com/api?city=${city}`)
      .then(r => r.json())
      .then((data) => {
        if(data.main !== undefined){
          const city = {
            min: Math.round(data.main.temp_min),
            max: Math.round(data.main.temp_max),
            img: data.weather[0].icon,
            id: data.id,
            wind: data.wind.speed,
            temp: data.main.temp,
            name: data.name,
            weather: data.weather[0].description,
            clouds: data.clouds.all,
            latitud: data.coord.lat,
            longitud: data.coord.lon
          }
          if (cities.some(c => c.id === city.id)){
            alert('Ya está la ciudad! \n Ingresa una nueva.')
          } else {
            setCities(oldC => [...oldC, city])
          }
        } else {
          alert('Ciudad no encontrada :(')
        }   
      })  
    }

  function onClose(cityId) {
  setCities(oldC => oldC.filter(c => c.id !== cityId))
  }

  function onFilter(cityId) {
    let city = cities.filter(c => c.id === parseInt(cityId));
    if (city.length > 0) {
      return city[0];
    } else {
      return null;
    }
  }

  return (
    <div className={style.App}>
      <Route path='/' render={() => <Nav onSearch={onSearch}/>}/>
      < div className={style.main}>
        <Route exact path='/'
          render={() => <Cards 
            cities={cities}
            onClose={onClose}  
          />}
        />
        <Route path='/about' component={About}/> 
        <Route 
          exact path='/city/:cityId' 
          render={({match}) => <City city={onFilter(match.params.cityId)}/>} />   
      </div>
    </div>
  );
}

export default App;
