import React from 'react';
import style from './App.module.css';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCity } from '../redux/actions';

import Cards from '../components/Cards.jsx';
import Nav from '../components/Nav'
import About from '../components/About'
import City from '../components/City'

function App() {
  const cities = useSelector(state => state);
  const dispatch = useDispatch();
  
  function onSearch(city) {
    dispatch(fetchCity(city));
  }
  // function onClose(cityId) {
  // setCities(oldC => oldC.filter(c => c.id !== cityId))
  // }

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
            // onClose={onClose}  
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
