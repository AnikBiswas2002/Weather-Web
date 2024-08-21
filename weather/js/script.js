const apiKey = "e5be820aaff82b4f1c98c34ae102e77d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("Weather data could not be retrieved.");
        
        const data = await response.json();
        console.log(data)

        if (data.cod === "404") {
            alert("City not found! Please try again.");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "img/clouds.png?" + new Date().getTime();
                break;
            case "Clear":
                weatherIcon.src = "img/clear.png?" + new Date().getTime();
                break;
            case "Rain":
                weatherIcon.src = "img/rain.png?" + new Date().getTime();
                break;
            case "Drizzle":
                weatherIcon.src = "img/drizzle.png?" + new Date().getTime();
                break;
            case "Mist":
                weatherIcon.src = "img/mist.png?" + new Date().getTime();
                break;
            case "Haze":
                weatherIcon.src = "img/haze.png?" + new Date().getTime();
                break;
            default:
                weatherIcon.src = "img/default.png?" + new Date().getTime();
        }
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}



searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});
