import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './MapView.module.css';
const { REACT_APP_URL_BACKEND } = process.env;

function MapView({lat, lng}) {

    return (
        <MapContainer center={[lat, lng]} zoom={10} scrollWheelZoom={false} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* <TileLayer 
                attribution='&copy; <a href="http://openweathermap.com">OpenWeatherMap</a>'
                url={`https://{s}.tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${REACT_APP_OWN_API_KEY}`}
            /> */}
            <TileLayer 
                attribution='&copy; <a href="http://openweathermap.com">OpenWeatherMap</a>'
                url={`${REACT_APP_URL_BACKEND}/get_layer/{s}/{z}/{x}/{y}.png`}
            />
            </MapContainer>
    )
}

export default MapView;
