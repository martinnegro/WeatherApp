import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './City.module.css'
import style from './City.module.css'
import MapView from "./MapView";

export default function City({cityId}) {
    const cities = useSelector(state => state)
    const [ city, setCity ]  = useState()
    
    useEffect(() => {
        const aux = cities.find(c => parseInt(c.id) === parseInt(cityId));
        setCity(aux)
    }, [cities, cityId])

    return (
        <div className="ciudad">
            <div className={style.container}>
                {   
                    !city ? <div>CARGANDO</div> :
                    city.length === 0 ? <div>NO HAY INFORMACIÓN!</div> :
                    <>
                        <h2 className={style.titulo}>{city.name}</h2>
                        <div className={style.info}>
                            <div className={style.firstInfo}>
                                <img src={`http://openweathermap.org/img/wn/${city.img}@2x.png`} alt='' className={style.icono}/>
                                <div className={style.temps}>
                                <div>
                                    <p>Min</p>
                                    <p>{city.min}°</p>
                                </div>
                                <div>
                                    <p>Max</p>
                                    <p>{city.max}°</p>
                                </div>
                                </div>
                            </div>
                            <div className={style.secondInfo}>
                                <div>Temperatura: {city.temp} ºC</div>
                                <div>Clima: {city.weather}</div>
                                <div>Viento: {city.wind} km/h</div>
                                <div>Nubes: {city.clouds}%</div>
                            </div>
                        </div>
                        <div className={style.mapContainer}>
                            <MapView lat={city.latitud} lng={city.longitud}/>
                        </div>
                    </>
                }
            </div>
            
        </div>
    )
}