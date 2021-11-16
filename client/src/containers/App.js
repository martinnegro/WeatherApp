import React, { useEffect } from 'react';
import style from './App.module.css';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrent, setCoord, fetchErrorCurrent } from '../redux/actions/currentlocation';

import Home from '../views/Home/';
import Nav from '../components/Nav'
import About from '../views/About/'
import City from '../views/City';

function App() {
  const dispatch = useDispatch();
  const { coord } = useSelector(state => state.currentlocation)  
  
  useEffect(()=>{
      if ( 'geolocation' in navigator ) {
          navigator.geolocation.getCurrentPosition((position) => {
              dispatch(setCoord(position.coords.latitude, position.coords.longitude))
          })
      } else {
          dispatch(fetchErrorCurrent(true, 'No se puede obtener la ubicación'))
      }   
  },[dispatch])
  
  useEffect(()=>{
      if ( coord.lon !== 0 && coord.lat !== 0 ) {
          dispatch(fetchCurrent(coord.lat,coord.lon))
      }
  },[coord,dispatch])

  return (
    <div className={style.App}>
      <Route path='/' component={Nav}/>
      < div className={style.main}> 
        <Route exact path='/'
          component={Home}
        />
        <Route path='/about' component={About}/> 
        <Route 
          exact path='/city/:cityId' 
          render={({match}) => <City cityId={match.params.cityId}/>} />   
      </div>
    </div>
  );
}

export default App;
