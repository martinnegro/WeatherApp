import React from 'react';

import Card from './Card.jsx';
import style from './Cards.module.css'

export default function Cards({cities,onClose}) {
  
  return (<div id={style.contenedor}>
            {
              !cities || cities.length < 1 ? <Card name='No hay ciudades cargadas'/> :
              cities.map(city => 
                city.isFetching ? <Card name='Cargando...' id={city.id} onClose={() => onClose(city.id)} key={city.id}/> :
                city.isError    ? <Card name={city.message} id={city.id} onClose={setTimeout(()=>onClose(city.id),3000)}key={city.id}/> :
                city.isPresent  ? <Card name={city.message} id={city.id} onClose={setTimeout(()=>onClose(city.id),3000)}key={city.id}/> :
                <Card 
                  name={city.name} 
                  min={city.min} 
                  max={city.max}
                  weatherImg={city.img}
                  key={city.id}
                  onClose={() => onClose(city.id)}
                  id={city.id}
                />
              )
            }
          </div>
)};
