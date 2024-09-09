let cityInput = document.querySelector(".container .search-box input");
let weatherLocation = document.querySelector(".container .weather-location");
let weather_img = document.querySelector(".container .weather-img img");
let temp = document.querySelector(".container .temp");
let weatherMain = document.querySelector(".container .weather_main_1");
let otherDetails = document.querySelector(".container .other-details");
let forecastBox = document.querySelector(".container .forecast-box");

let apiKey ="a000c572e298127ed2c49d594cf592b3"

let getWeatherDetails = (city)=>{
    // let city = cityInput.value;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url).then((res) => res.json()).then((data) =>{
        // console.log(data);
        weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherMain.innerHTML = data.weather[0].main;
        weatherLocation.innerHTML=`<i class="fa-solid fa-location-dot"></i>${data.name}`;
        temp.innerHTML = `${data.main.temp}&#176;`;

        otherDetails.innerHTML=`
            <div>
                <span>Feels like</span>
                <p>${data.main.feels_like}&#176;</p>
            </div>
            <div>
                <span>Min temp</span>
                <p>${data.main.temp_min}&#176;</p>
            </div>
            <div>
                <span>Humidity</span>
                <p>${data.main.humidity}%</p>
            </div>
            <div>
                <span>Wind speed</span>
                <p>${data.wind.speed}km/h</p>
            </div>
            <div>
                <span>Max temp</span>
                <p>${data.main.temp_max}&#176;</p>
            </div>
            <div>
                <span>Pressure</span>
                <p>${data.main.pressure}mbar</p>
            </div>`;
    }).catch(() =>{
        alert("Error! city name not found");
    })
}

cityInput.addEventListener("keyup", (e)=>{
    if(e.key == "Enter" && e.target.value != ""){
        getWeatherDetails(cityInput.value);
        getWeatherForecast(cityInput.value);
    }
})

let getWeatherForecast = (city) =>{
    const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecast_url).then((res) => res.json()).then((data) =>{
        const uniqueForecastdays =[];
        const fiveDaysForecast = data.list.filter(forecast =>{
            const forecastDate = new Date(forecast.dt_txt).getDate();

            if(!uniqueForecastdays.includes(forecastDate)){
                return uniqueForecastdays.push(forecastDate);
            }
        })

        forecastBox.innerHTML = "";

    fiveDaysForecast.forEach((weatherItem,index) => {
        forecastBox.insertAdjacentHTML("beforeend", createForecastCard(weatherItem,index));
    });    
    }).catch(() =>{
        alert("Error! city name not found");
    })
}
let createForecastCard = (item,index) =>{
    
    if(index === 0){
        return ``;
    }else{
        let forecastImage = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        let forecastD = new Date(item.dt_txt);
        let foreCastYear = forecastD.getFullYear();
        let forecastMonth = forecastD.getMonth();
        let forecastDate = forecastD.getDate();

        forecastMonth = forecastMonth < 10 ? "0" +forecastMonth : forecastMonth;
        forecastD = forecastDate < 10 ? "0" + forecastDate : forecastDate;

        return `
         <div class="card">
            <p class="forecast-date">${foreCastYear}-${forecastMonth}-${forecastDate}</p>
            <div class="forecast-img">
                <img src="${forecastImage}" alt="">
            </div>
            <h5 class="forecast-temp">${item.main.temp}&#176;</h5>
        </div>`;
    }

}

getWeatherForecast(cityInput.value);
getWeatherDetails(cityInput.value);