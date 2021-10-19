import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './CurrentInfo.module.css'
import DayCard from './DayCard';

const convertToHours = (UTC) => {
    const date = new Date(UTC * 1000);
    let hh = date.getHours();
    if (hh < 10) hh = `0${hh}`
    let mm = date.getMinutes();
    if (mm < 10) mm = `0${mm}`
    return `${hh}:${mm}`    
};

export default function CurrentInfo({ id }) {
    const currentInfo = useSelector(state => state.currentlocation.currentInfo);
    const [ name, setName ] = useState(null)
    const [ today, setToday ] = useState('');
    const [ sun, setSun ] = useState({
        sunrise: '',
        sunset: ''
    })
    const [ icon, setIcon ] = useState('')
    const [ daily, setDaily ] = useState(null)

    useEffect(()=>{
        if (currentInfo.current){
            let auxName = currentInfo.timezone.split('/');
            auxName = auxName[2].replace('_',' ')
            setName(auxName)
            setToday(new Date(currentInfo.current.dt * 1000).toLocaleDateString('es-AR'))
            setIcon(currentInfo.current.weather[0].icon)
            setSun({
                sunrise: convertToHours(currentInfo.current.sunrise),
                sunset: convertToHours(currentInfo.current.sunset)
            })
            setDaily(currentInfo.daily)
        }
    },[])

    return (
        <div className={style.container}>
            {
                currentInfo ?
                <>
                <h1>{name}</h1>
                <h2>{today}</h2>
                <p>Sunrise: {sun.sunrise}</p>
                <p>Sunset: {sun.sunset}</p>
                {
                    icon.length > 0 ?
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                    : null
                }
                <div className={style.dailyContainer}>
                    {
                        daily?.map( d =>(
                            <DayCard 
                                day={d} 
                                convertToHours={convertToHours}
                            />
                        ))
                    }
                </div>
                </>
                : null
            }
        </div>
    )
}
