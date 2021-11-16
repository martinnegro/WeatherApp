import React from 'react';
import { useSelector } from 'react-redux';
import CurrentForecast from './CurrentForecast';
import CurrentInfo from './CurrentInfo';

import style from './CurrentLocation.module.css'

function CurrentLocation() {
    const { isFetching } = useSelector(state => state.currentlocation);

    return (
        <div className={style.container}>
            {
                isFetching ?
                <div>CARGANDO...</div>
                :
                <>
                <CurrentInfo/>
                <CurrentForecast/>       
                </>
            }    
        </div>
    )
}



export default CurrentLocation
