# WeatherApp
WeatherApp es una apliación para mostrar el estado meteorológico de cualquier parte del mundo. Consigue la información actualizada de [OpenWeatherMap](https://openweathermap.org/). Utiliza las teconologías React y Redux para el front y Express para el back.

[En este enlace](https://martinnegro-weatherapp.netlify.app/) pueden encontrar un deploy en Netlify, mientras que el back se encuentra en Heroku.

### Preparación

- Clone el repositorio y ejecute `npm install` en los directorios api y client por separado para instalar las dependencias.
- En la carpeta __api__ cree un archivo __.env__ y configure la variable `API_KEY` con la clave provista por [OpenWeatherMap](https://openweathermap.org/).
- En la carpeta __client__ cree un archivo __.env__ y configure la variable `REACT_APP_URL_BACKEND`, que corresponde la dirección del backend. Puede ser `http://localhost:5000` o la que corresponda a la api deployada externamente.

### Ejecución
- Ejecute el comando `npm start` sobre el directorio __api__ para levantar el servidor.
- Luego ejecute `npm start` en __client__ para correr la aplicación React. Se abrirá en su navegador el sitio.
