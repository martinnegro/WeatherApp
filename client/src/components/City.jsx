import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from './City.module.css'

export default function City({cityId}) {
    const cities = useSelector(state => state)
    const [ city, setCity ]  = useState()

    useEffect(() => {
        const aux = cities.find(c => parseInt(c.id) === parseInt(cityId));
        console.log(aux)
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
                            <div>Temperatura: {city.temp} ºC</div>
                            <div>Clima: {city.weather}</div>
                            <div>Viento: {city.wind} km/h</div>
                            <div>Cantidad de nubes: {city.clouds}%</div>
                            <div>Latitud: {city.latitud}º</div>
                            <div>Longitud: {city.longitud}º</div>
                        </div>
                    </>
                }
            </div>
            
        </div>
    )
}