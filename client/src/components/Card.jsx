import React from 'react';
import { Link } from 'react-router-dom'
import style from './Card.module.css'

export default function Card({onClose,name,min,max,weatherImg,id}) {
  
  let urlImg = `http://openweathermap.org/img/wn/${weatherImg}@2x.png`
  return (
          <div className={style.contenedor}>
            <button onClick={onClose} className={style.closeBtn}></button>
            
               
              <h4 className={style.sinCiudad}>  {name}</h4>
            
            {
              (min && max) ?
            <>
              <div className={`${style.min} ${style.temp}`}>
                <p>Min</p>
                <p>{min}°</p>
              </div>
              <div className={`${style.max} ${style.temp}`}>
                <p>Max</p>
                <p>{max}°</p>
              </div>
              <img src={urlImg} alt='' className={style.icono}/>
            </> :
              <></>
            }
          </div>
)};