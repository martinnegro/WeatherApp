import React, { useState } from 'react';
import style from './SearchBar.module.css'

export default function SearchBar({onSearch}) {
  const [city, setCity] = useState('');


  return (
    <form 
      className={style.buscar}
      onSubmit={(e) =>{
        e.preventDefault();
        onSearch(city);
        setCity('')
      }}
    >
        <input className={style.inpForm} type='text' placeholder='Ingrese ciudad'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input className={style.inpButton} 
          type="submit" 
          value="Agregar"
        />
    </form>
  )
};