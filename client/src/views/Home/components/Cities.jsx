import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeCity } from '../../../redux/actions/cities';
import Card from './Card.jsx';
import style from './Cards.module.css'

export default function Cards() {
  const cities = useSelector(state => state.cities);
  const dispatch = useDispatch();

  const onClose = (localID) => {
    dispatch(closeCity(localID))
  }
  
  return (<div id={style.contenedor}>
            {
              !cities || cities.length < 1 ? <Card name='No hay ciudades cargadas'/> :
              cities.map(city => 
                city.isFetching ? <Card name='Cargando...' id={city.city.id} onClose={() => onClose(city.localID)} key={city.localID}/> :
                city.isError    ? <Card name={city.message} id={city.id} onClose={setTimeout(()=>onClose(city.localID),3000)}key={city.id}/> :
                city.isPresent  ? <Card name={city.message} id={city.id} onClose={setTimeout(()=>onClose(city.localID),3000)}key={city.id}/> :
                <Card 
                  name={city.city.name} 
                  min={city.city.min} 
                  max={city.city.max}
                  weatherImg={city.city.img}
                  key={city.localID}
                  onClose={() => onClose(city.localID)}
                  id={city.city.id}
                />
              )
            }
          </div>
)};
