const fahrenheitToCelsius = (f) => ((f - 32) * (5 / 9)).toFixed(2);

const iconToImageIndex = {
    "snow": 0, "rain": 1, "fog": 2, "wind": 3, "cloudy": 4,
    "partly-cloudy-day": 5, "partly-cloudy-night": 5, "clear-day": 6, "clear-night": 7
};

// Select DOM elements
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
let apiUrlTemplate = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hyderabad?unitGroup=us&include=days%2Cevents&key=7VNDDSKQZWW5GKCWREYN35BDC&contentType=json";

// Fetch weather data
async function fetchWeatherData(dayOffset = 0) {
    // Get the city input or use default
    let city = document.querySelector("#search").value.toLowerCase() || "hyderabad";
    let apiUrl = apiUrlTemplate.replace("[CITY]", city);

    try {
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        result = await response.json();

        // Hide any previous alerts
        alertMsg.style.visibility = "hidden";
        
        // Update weather information with current day offset
        updateWeatherInfo(dayOffset, city);
    } catch (error) {
        alertMsg.textContent = "Failed to fetch data. Please check your connection.";
        alertMsg.style.visibility = "visible";
        console.error("Fetch error:", error);
    }
}

// Update weather information on the page
function updateWeatherInfo(dayOffset, city) {
    let dayData = result.days[dayOffset];
    
    // Update heading and temperature display
    hHeading.textContent = `Weather For ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    temperatue1.textContent = `${fahrenheitToCelsius(dayData.temp)}ºC`;
    temperatue2.textContent = `Temperature is: ${fahrenheitToCelsius(dayData.temp)}ºC`;

    // Update other weather data as needed (e.g., humidity, wind speed, etc.)
    // hum1.textContent = `${dayData.humidity} %`;
    // hum2.textContent = `Humidity: ${dayData.humidity}%`;
    // Add more fields here as in the example...
}

// Event listener for the main button to fetch data
btn.addEventListener("click", () => {
    count = 0; // Reset the day offset
    fetchWeatherData(count);
});

// Optional: other buttons to increment days, etc., if using dayOffset
tButton.addEventListener("click", () => {
    count++;
    fetchWeatherData(count);
});
tButton2.addEventListener("click", () => {
    count++;
    fetchWeatherData(count);
});
