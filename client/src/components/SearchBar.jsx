import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCity } from '../redux/actions/cities';
import style from './SearchBar.module.css'

export default function SearchBar({onSearch}) {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCity(city));
    setCity('');
  };

  return (
    <form 
      className={style.buscar}
      onSubmit={handleOnSubmit}
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