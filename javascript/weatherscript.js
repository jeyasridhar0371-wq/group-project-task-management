// localStorage.clear();

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchBtn');
const temprature = document.getElementById('temp');
const cityName = document.getElementById('cityName');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const feelsLike = document.getElementById('feelsLike');
const loading = document.getElementById('loading');
const history = document.getElementById('history');

let lastCity = JSON.parse(localStorage.getItem("lastCity")) || [];
console.log(document.activeElement===cityInput)
// load seaech history from local storage
cityInput.addEventListener('focus', () => {
    console.log(lastCity);
    if (lastCity.length > 0) {
        history.classList.remove('hidden');
        lastCity.forEach(city => {
            const div = document.createElement('div');
            div.className = "flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer";
            const p1 = document.createElement('p');
            p1.className = "text-sm text-gray-700 p-2 cursor-pointer hover:bg-gray-200";
            p1.innerText = city;
            div.addEventListener("click",()=>{
                cityInput.value=p1.innerText
                cityInput.focus();
                 history.classList.add('hidden')
                 history.innerHTML = ''
            })
            div.appendChild(p1);
            const p2 = document.createElement('p');
            p2.className = "text-sm text-gray-700 p-2 cursor-pointer hover:bg-gray-200";
            p2.innerText = "X";
            div.appendChild(p2);
            history.appendChild(div);
            
        });
        
    }
});
// cityInput.addEventListener("focusout", () => {
//     history.classList.add('hidden')
//     history.innerHTML = ''
// })

// get weather details from API
async function getWeather() {
    try {
        history.innerHTML = ''
        loading.classList.remove('hidden');
        const city = cityInput.value;
        // let lastCity = localStorage.getItem("lastCity") || [];
        if (!lastCity.includes(city)) {
            lastCity.push(city);
            localStorage.setItem("lastCity", JSON.stringify(lastCity));
        }
        const apiKey = "a6d56f21850d81b841da58aaa888791f";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        loading.classList.add('hidden');
        // console.log(data);
        temprature.innerText = `${data.main.temp} °C`;
        cityName.innerText = data.name;
        condition.innerText = data.weather[0].main;
        const iconCode = data.weather[0].main;
        if (iconCode === "Clouds") {
            weatherIcon.innerText = "☁️";
            document.body.className = "bg-gradient-to-br from-blue-300 to-gray-500 min-h-screen";
        }
        else if (iconCode === "Rain") {
            weatherIcon.innerText = "🌧️";
            document.body.className = "bg-gradient-to-br from-gray-500 to-gray-800 min-h-screen";
        }
        else if (iconCode === "Clear") {
            weatherIcon.innerText = "☀️";
            document.body.className = "bg-gradient-to-br from-yellow-300 to-orange-500 min-h-screen";
        }
        else if (iconCode === "Snow") {
            weatherIcon.innerText = "❄️";
            document.body.className = "bg-gradient-to-br from-blue-300 to-blue-500 min-h-screen";
        }
        else if (iconCode === "Thunderstorm") {
            weatherIcon.innerText = "⛈️";
            document.body.className = "bg-gradient-to-br from-gray-600 to-gray-800 min-h-screen";
        }
        else {
            weatherIcon.innerText = "🌍";
            document.body.className = "bg-gradient-to-br from-blue-400 to-blue-700 min-h-screen"
        }

        humidity.innerText = `${data.main.humidity}%`;
        wind.innerText = `${Math.floor(data.wind.speed * 3.6)} km/h`;
        pressure.innerText = `${data.main.pressure} hPa`;
        feelsLike.innerText = `${data.main.feels_like} °C`;
    } catch (error) {
        loading.classList.add('hidden');
        alert("City not found. Please enter a valid city name.");
        location.reload();

    }

}
// forecast function
async function getForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a6d56f21850d81b841da58aaa888791f&units=metric`);
    const data = await response.json();
    // console.log(data);
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    // console.log(dailyData);
    document.getElementById('forecast').innerHTML = '';
    dailyData.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white/20 rounded-2xl p-4 min-w-[100px] text-center";
        const date = item.dt_txt;
        const temp = item.main.temp;
        const condition = item.weather[0].main;
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        card.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${day}</h3>
            <p class="text-2xl mb-2">${temp} °C</p>
            <p>${condition}</p>
        `;
        document.getElementById('forecast').appendChild(card);
    });
}
// call back the function when "get weather" is clicked
searchButton.addEventListener('click', () => {
    getWeather();
    getForecast(cityInput.value);
});
// enable enter function instead of "get weather" button
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
        getForecast(cityInput.value);
    }

});