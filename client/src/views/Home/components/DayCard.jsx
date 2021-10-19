import React, { useEffect, useState } from 'react';

const DayCard = ({ day, convertToHours }) => {
    const [ dayName, setDayName ] = useState(null)
    const [ temp, setTemp ] = useState(null)
    useEffect(()=>{
        const auxDay = new Date(day.dt * 1000).getDay();
        auxDay === 0 ? setDayName('Domingo') :
        auxDay === 1 ? setDayName('Lunes') :
        auxDay === 2 ? setDayName('Martes') :
        auxDay === 3 ? setDayName('Miércoles') :
        auxDay === 4 ? setDayName('Jueves') :
        auxDay === 5 ? setDayName('Viernes') :
        setDayName('Sábado');


    },[day])

    console.log(day)

    return (
        <div>
            <p>{dayName}</p>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/>
            <p>Min {day.temp.min.toFixed(1)}°</p>
            <p>Max {day.temp.max.toFixed(1)}°</p>
        </div>
    )
};

export default DayCard