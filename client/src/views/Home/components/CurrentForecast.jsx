import React from 'react'
import { useSelector } from 'react-redux'

export default function CurrentForecast() {
    const currentForecast = useSelector(state => state.currentlocation.forecast)

    return (
        <div>
            
        </div>
    )
}
