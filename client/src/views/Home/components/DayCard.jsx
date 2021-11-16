import React, { useEffect, useState } from 'react';
import getDayName from '../../../utils/getDayName';

const DayCard = ({ day, convertToHours }) => {
    const [ dayName, setDayName ] = useState(null)
        
    useEffect(()=>{
        setDayName(getDayName(day.dt));
    },[day])

    return (
        <div>
            <p>{dayName}</p>
            <img 
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={`Estado del clima el día ${dayName}`}
            />
            <p>Min {day.temp.min.toFixed(1)}°</p>
            <p>Max {day.temp.max.toFixed(1)}°</p>
        </div>
    )
};

export default DayCard