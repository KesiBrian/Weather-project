document.addEventListener("DOMContentLoaded", () => {
    const weatherResult = document.getElementById("weatherResult");
    const getWeatherButton = document.getElementById("getWeather");
    const cityInput = document.getElementById("city");

    // Get weather data from db.json
    getWeatherButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();

        fetch("db.json")
            .then(response => response.json())
            .then(data => {
                const cityData = data.weatherData.find(city => city.city.toLowerCase() === cityName.toLowerCase());
                if (cityData) {
                    weatherResult.innerHTML = `
                        <h4>Weather in ${cityData.city}</h4>
                        <p>Temperature: ${cityData.temperature} °C</p>
                        <p>Condition: ${cityData.condition}</p>
                        <p>${cityData.description}</p>
                    `;
                } else {
                    weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                weatherResult.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            });
    });

    // Toggle dark mode
    document.getElementById('toggleBg').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode'); // Toggle the dark-mode class
    });
});
