import React from 'react';
import Cities from './components/Cities'
import CurrentLocation from './components/CurrentLocation';

import style from './Home.module.css'

function Home() {
    return (
        <div className={style.container}>
            <CurrentLocation/>
            <Cities/>
        </div>
    )
}

export default Home
