 const convertToHours = (UTC) => {
    const date = new Date(UTC * 1000);
    let hh = date.getHours();
    if (hh < 10) hh = `0${hh}`
    let mm = date.getMinutes();
    if (mm < 10) mm = `0${mm}`
    return `${hh}:${mm}`    
};
export default convertToHours;