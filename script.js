
let cityInput = document.querySelector(".container .search-box input");
let weatherLocation = document.querySelector(".container .weather-location");
let weather_img = document.querySelector(".container .weather-img img");
let temp = document.querySelector(".container .temp");
let weatherMain = document.querySelector(".container .weather_main_1");
let otherDetails = document.querySelector(".container .other-details");
let forecastBox = document.querySelector(".container .forecast-box");


let apiKey = "a000c572e298127ed2c49d594cf592b3";


let defaultCity = "London";

let getWeatherDetails = (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherMain.innerHTML = data.weather[0].main;
            weatherLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i>${data.name}`;
            temp.innerHTML = `${data.main.temp}&#176;`;

            otherDetails.innerHTML = `
                <div>
                    <i class="fa-solid fa-temperature-high"></i>
                    <span>Feels like</span>
                    <p>${data.main.feels_like}&#176;</p>
                </div>
                <div>
                    <i class="fa-solid fa-temperature-low"></i>
                    <span>Min temp</span>
                    <p>${data.main.temp_min}&#176;</p>
                </div>
                <div>
                    <i class="fa-solid fa-droplet"></i>
                    <span>Humidity</span>
                    <p>${data.main.humidity}%</p>
                </div>
                <div>
                    <i class="fa-solid fa-wind"></i>
                    <span>Wind speed</span>
                    <p>${data.wind.speed} km/h</p>
                </div>
                <div>
                    <i class="fa-solid fa-temperature-high"></i>
                    <span>Max temp</span>
                    <p>${data.main.temp_max}&#176;</p>
                </div>
                <div>
                    <i class="fa-solid fa-gauge-high"></i>
                    <span>Pressure</span>
                    <p>${data.main.pressure} mbar</p>
                </div>`;
        })
        .catch(() => {
            alert("Error! City name not found");
        });
};

cityInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && e.target.value != "") {
        getWeatherDetails(cityInput.value);
        getWeatherForecast(cityInput.value);
    }
});

let getWeatherForecast = (city) => {
    const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecast_url)
        .then((res) => res.json())
        .then((data) => {
            const uniqueForecastdays = [];
            const fiveDaysForecast = data.list.filter((forecast) => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastdays.includes(forecastDate)) {
                    return uniqueForecastdays.push(forecastDate);
                }
            });

            forecastBox.innerHTML = "";

            fiveDaysForecast.forEach((weatherItem, index) => {
                forecastBox.insertAdjacentHTML("beforeend", createForecastCard(weatherItem, index));
            });
        })
        .catch(() => {
            alert("Error! City name not found");
        });
};

let createForecastCard = (item, index) => {
    if (index === 0) {
        return ``;
    } else {
        let forecastImage = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        let forecastD = new Date(item.dt_txt);
        let forecastYear = forecastD.getFullYear();
        let forecastMonth = forecastD.getMonth() + 1; 
        let forecastDate = forecastD.getDate();

        forecastMonth = forecastMonth < 10 ? "0" + forecastMonth : forecastMonth;
        forecastDate = forecastDate < 10 ? "0" + forecastDate : forecastDate;

        return `
         <div class="card">
            <p class="forecast-date">${forecastYear}-${forecastMonth}-${forecastDate}</p>
            <div class="forecast-img">
                <img src="${forecastImage}" alt="">
            </div>
            <h5 class="forecast-temp">${item.main.temp}&#176;</h5>
        </div>`;
    }
};


getWeatherDetails(defaultCity);
getWeatherForecast(defaultCity);
