import React from 'react';
import { useSelector } from 'react-redux';
import CurrentGraphic from './CurrentGraphic';
import convertToHours from '../../../utils/convertToHours';
import style from './CurrentInfo.module.css'
import getDayName from '../../../utils/getDayName';

export default function CurrentInfo({ id }) {
    const { isFetching, isError, current } = useSelector(state => state.currentlocation);
    
    return (
        <div className={style.container}>
            {
                !isFetching && !isError ?
                <>
                <h1 style={{margin: 0}}>{current.name}</h1>
                <h2 style={{margin: 0}}>{current.day}</h2>
                <h3 style={{margin: 0}}>{getDayName(current.dt)} {current.today}</h3>
                <div className={style.infoContainer}>
                    <div>
                        <h3>{current.main.temp.toFixed(1)}°C</h3>
                        {
                            current.icon.length ?
                            <img 
                                src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
                                alt={`Estado del clima en ${current.name}`}
                            />
                            : null
                        }
                    </div>
                    <div>
                        <div>
                            <p>Min: {current.main.temp_min.toFixed(1)}°</p>
                            <p>Max: {current.main.temp_max.toFixed(1)}°</p>
                        </div>
                        <div>
                            <h5 style={{margin: 0}}>Sol</h5>
                            <p>Salida: {current.sun.sunrise}</p>
                            <p>Puesta: {current.sun.sunset}</p>
                        </div>
                    </div>
                </div>
                    <CurrentGraphic
                        convertToHours={convertToHours}
                    ></CurrentGraphic>                
                </>
                : null
            }
        </div>
    )
}
