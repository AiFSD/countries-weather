const REST_COUNTRIES_API = "https://restcountries.com/v3.1/all";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "079d4e4e97aeb7d6fcac6cdbefd29e3a";

document.addEventListener("DOMContentLoaded", () => {
  fetchCountries();
});

async function fetchCountries() {
  try {
    const response = await fetch(REST_COUNTRIES_API);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

function displayCountries(countries) {
  const container = document.getElementById("country-cards");
  container.innerHTML = "";

  countries.forEach((country) => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4";

    const capital = country.capital ? country.capital[0] : "N/A";

    const cardInner = document.createElement("div");
    cardInner.className = "card h-100";

    cardInner.innerHTML = `
      <img src="${country.flags.svg}" class="card-img-top" alt="${
      country.name.common
    } flag">
      <div class="card-header">
        ${country.name.common}
      </div>
      <div class="card-body">
        <div class="card-text">
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Native Name:</strong> ${
            Object.values(country.name.nativeName || {})[0]?.common || "N/A"
          }</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        </div>
        <button class="btn btn-primary" onclick="fetchWeather('${capital}')">Click for Weather</button>
      </div>
    `;

    card.appendChild(cardInner);
    container.appendChild(card);
  });
}

async function fetchWeather(cityName) {
  try {
    const response = await fetch(
      `${WEATHER_API}?q=${cityName}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const weather = await response.json();

    console.log("Weather data:", weather);

    if (weather && weather.weather && weather.weather.length > 0) {
      const description = weather.weather[0].description;
      const city = weather.name || "Unknown city";
      alert(`Weather in ${city}: ${description}`);
    } else {
      alert(
        "Weather information is not available or there was an error with the request."
      );
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("An error occurred while fetching weather data.");
  }
}
