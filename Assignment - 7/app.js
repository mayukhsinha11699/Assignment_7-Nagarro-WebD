const form = document.getElementById("form");
const today = new Date();

const namee = document.getElementById("city-name");
const curTime = document.getElementById("current-date");
const curTemp = document.getElementById("current-temp");
const visib = document.getElementById("visibility");
const minMax = document.getElementById("min-max");
const imge = document.getElementById("choti-img");

const formatDate = (today) => {
    var month = today.getMonth();
    var day = today.getDay();
    var date = today.getDate();
    var year = today.getFullYear();

    if(day == 0) day = "Sunday";
    if(day == 1) day = "Monday";
    if(day == 2) day = "Tuesday";
    if(day == 3) day = "Wednesday";
    if(day == 4) day = "Thursday";
    if(day == 5) day = "Friday";
    if(day == 6) day = "Saturday";

    if(month == 0) month = "Jan";
    if(month == 1) month = "Feb";
    if(month == 2) month = "Mar";
    if(month == 3) month = "Apr";
    if(month == 4) month = "May";
    if(month == 5) month = "Jun";
    if(month == 6) month = "Jul";
    if(month == 7) month = "Aug";
    if(month == 8) month = "Sept";
    if(month == 9) month = "Oct";
    if(month == 10) month = "Nov";
    if(month == 11) month = "Dec";

    const formattedDate = `${day}, ${date} ${month} ${year}`;

    return formattedDate;
}

const roundOff = (num) => {
    return Math.round(num * 100) / 100;
}

const getWeatherData = async(searchText) => {
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=20b83e3a2e71f1d8d8b9fa30440d2298`;

        const response = await fetch(url);
        const fetchedData = await response.json();

        const imageVal = `${fetchedData.weather[0].icon}`;

        console.log(fetchedData);
        imge.src=`http://openweathermap.org/img/wn/${imageVal}@2x.png`;
        namee.innerHTML = `${fetchedData.name}, ${fetchedData.sys.country}`;
        curTime.innerHTML = `${formatDate(today)}`;
        curTemp.innerHTML = `${roundOff(fetchedData.main.temp - 273.15)} &#8451;`;
        visib.innerHTML = `${fetchedData.weather[0].main}`;
        minMax.innerHTML = `Max = ${roundOff(fetchedData.main.temp_max - 273.15)}&#8451; , Min = ${roundOff(fetchedData.main.temp_min - 273.15)}&#8451;`;
    
}

form.addEventListener('submit', (e) => {

    e.preventDefault();
    const searchText = form.elements[0].value;
    getWeatherData(searchText);
    form.elements[0].value = "";

});


