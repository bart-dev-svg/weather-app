console.log("script loaded");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

searchButton.addEventListener("click", async function () {
  const city = cityInput.value;

  if (city === "") {
    result.textContent = "Type a city first.";
    return;
  }

  result.textContent = "Loading...";

  try {
    const geoResponse = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1"
    );
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      result.textContent = "City not found.";
      return;
    }

    const place = geoData.results[0];

    const weatherResponse = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
      "&longitude=" + place.longitude +
      "&current=temperature_2m,wind_speed_10m" +
      "&temperature_unit=fahrenheit&wind_speed_unit=mph"
    );
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current.temperature_2m;
    const wind = weatherData.current.wind_speed_10m;

    result.textContent = place.name + ": " + temp + "°F, wind " + wind + " mph";
  } catch (error) {
    result.textContent = "Something went wrong. Try again.";
  }
});