const getDayName = (UTC) => {
    const auxDay = new Date(UTC * 1000).getDay();
    let stringDay;
    auxDay === 0 ? stringDay = 'Domingo' :
    auxDay === 1 ? stringDay = 'Lunes' :
    auxDay === 2 ? stringDay = 'Martes' :
    auxDay === 3 ? stringDay = 'Miércoles' :
    auxDay === 4 ? stringDay = 'Jueves' :
    auxDay === 5 ? stringDay = 'Viernes' :
    stringDay = 'Sábado';

    return stringDay;
};

export default getDayName;