import React from 'react'
import { useSelector } from 'react-redux';
import style from './CurrentInfo.module.css'
import DayCard from './DayCard';
import convertToHours from '../../../utils/convertToHours';

export default function CurrentForecast() {
    const currentInfo = useSelector(state => state.currentlocation);

    return (
        <div className={style.dailyContainer}>
        {
            currentInfo.forecast.daily?.map( d =>(
                <DayCard 
                    key={d.dt}
                    day={d} 
                    convertToHours={convertToHours}
                />
            ))
        }
        </div>
    )
}
