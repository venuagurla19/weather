const fahrenheitToCelsius = (f) => ((f - 32) * (5 / 9)).toFixed(2);
const iconToImageIndex = {
"snow": 0, "rain": 1, "fog": 2, "wind": 3, "cloudy": 4,
"partly-cloudy-day": 5, "partly-cloudy-night": 5, "clear-day": 6, "clear-night": 7
};

let temperatue1 = document.querySelector("#Temp1");
let temperatue2 = document.querySelector("#Temp2");
let tempMax = document.querySelector("#max-temp");
let tempMin = document.querySelector("#min-temp");
let btn = document.querySelector("#nav-btn");
let hum1 = document.querySelector("#Humidity1");
let hum2 = document.querySelector("#Humidity2");
let Dew = document.querySelector("#dew");
let precip = document.querySelector("#precip");
let wSpeed1 = document.querySelector("#wind-speed1");
let wSpeed2 = document.querySelector("#wind-speed2");
let wGust = document.querySelector("#wind-gust");
let wDir = document.querySelector("#wind-dir");
let Rain = document.querySelector("#rain");
let Cloud = document.querySelector("#cloud");
let Press = document.querySelector("#pressure");
let sRise = document.querySelector("#sunrise");
let sSet = document.querySelector("#sunset");
let Radiation = document.querySelector("#radiation");
let UVIndex = document.querySelector("#uv-index");
let desc = document.querySelector("#desc");
let alertMsg = document.querySelector("#alert");
let hHeading = document.querySelector("#hero-heading");
let mPhase = document.querySelector("#m-phase");
let visib = document.querySelector("#visib");
let tButton = document.querySelector("#t-btn");
let tButton2 = document.querySelector("#t-btn2");
let dateInput = document.querySelector("#date1");
let dateBtn = document.querySelector("#date-btn");
let dayText = document.querySelector("#day");
let others = document.querySelector("#others");

let count = 0;
let result;
let urlTemplate = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[CITY]?unitGroup=us&include=days%2Cevents&key=YOUR_API_KEY&contentType=json";

async function fetchWeatherData(dayOffset = 0) {
let city = document.querySelector("#search").value.toLowerCase() || "hyderabad";
let apiUrl = urlTemplate.replace("[CITY]", city);
try {
    let response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    result = await response.json();
} catch (error) {
    alertMsg.textContent = "Failed to fetch data. Please check your connection.";
    alertMsg.style.visibility = "visible";
    return;
}

try {
    const response = await fetch(tempUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    result = await response.json();
} catch (error) {
    alert("Network error or API limit reached. Please check your connection and try again.");
    console.error('Fetch error:', error);
}


updateWeatherInfo(dayOffset);
}

function updateWeatherInfo(dayOffset) {
let dayData = result.days[dayOffset];

    hHeading.textContent = `Weather For ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    temperatue1.textContent = `${fahrenheitToCelsius(dayData.temp)}ºC`;
    temperatue2.textContent = `Temperature is: ${fahrenheitToCelsius(dayData.temp)}ºC`;
}
