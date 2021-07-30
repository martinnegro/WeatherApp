import React from "react";
import style from './City.module.css'




export default function City({city}) {

    

    return (
        <div className="ciudad">
            <div className={style.container}>
                <h2 className={style.titulo}>{city.name}</h2>
                <div className={style.info}>
                    <div>Temperatura: {city.temp} ºC</div>
                    <div>Clima: {city.weather}</div>
                    <div>Viento: {city.wind} km/h</div>
                    <div>Cantidad de nubes: {city.clouds}%</div>
                    <div>Latitud: {city.latitud}º</div>
                    <div>Longitud: {city.longitud}º</div>
                </div>
                
            </div>
            
        </div>
    )
}