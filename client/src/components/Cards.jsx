import React from 'react';

import Card from './Card.jsx';
import style from './Cards.module.css'

export default function Cards({cities,onClose}) {
  if (cities.length < 1) return 'Sin ciudades.'
  return (<div id={style.contenedor}>
            {
              cities.map(city => 
                city.isFetching ? <Card name='Cargando...'/> :
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
