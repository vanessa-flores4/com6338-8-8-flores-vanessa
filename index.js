// openweathremap.org API key: f75423644d329812f146960de698918d

var weatherApp = document.getElementById("weather-app");
var weather = document.getElementById("weather");
var searchLocation = document.getElementById("weather-search");
var inputEl = document.querySelector("input");
var form = document.querySelector("form");
var locationSearched = document.createElement("h2");
var lineBreak = document.createElement("br");
var div = document.createElement("div");
var weatherAPIKey = "f75423644d329812f146960de698918d"

form.onsubmit = function (e) {
    e.preventDefault()
    weather.prepend(div)
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
    var search = this.search.value.trim();
    var fetchURL = weatherURL + search + "&units=imperial&appid=" + weatherAPIKey;
    if ((!search) || (searchLocation.value = '')) {
        search = ""
    }
    fetch(fetchURL)
    .then(function (res) {
        if (res.status != 200) throw new Error('Location Not Found')
        return res.json()
        })
    .then(data)
    .catch(function (err) {
    div.innerHTML = err.message
    })
}

function data(data) {
    div.innerHTML = ""
    search = ""
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    
    var locationSearched = document.createElement("h2");
    div.appendChild(locationSearched)
    locationSearched.textContent = data.name + " , " + data.sys.country
    
    var viewMapLink = document.createElement("a");
    var mapURL = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon
    viewMapLink.href = mapURL
    viewMapLink.setAttribute('target', '_BLANK')
    viewMapLink.textContent = "Click to View Map"
    div.insertBefore(viewMapLink, displayedImg); 
   
    var weatherDescr = document.createElement("p");
    weatherDescr.setAttribute('style', 'text-transform: capitalize')
    weatherDescr.textContent = data.weather[0].description
    div.appendChild(weatherDescr)

    div.appendChild(lineBreak)

    var displayedImg = document.createElement("img");
    var icon = data.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    displayedImg.src = iconURL
    displayedImg.alt = data.name
    div.appendChild(displayedImg )

    var currentTemp = document.createElement("p");
    currentTempNumber = data.main.temp
    currentTemp.textContent = "Current:  " + currentTempNumber + '° F'
    div.appendChild(currentTemp)

    var feelsLikeTemp = document.createElement("p");
    feelsLikeTempNumber = data.main.feels_like
    feelsLikeTemp.textContent = "Feels like:  " + feelsLikeTempNumber + '° F'
    div.appendChild(feelsLikeTemp)

    div.appendChild(lineBreak)

    var dt = data.dt * 1000;
    var date = new Date(dt);
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    
    var lastUpdate = document.createElement("p");
    lastUpdate.textContent = 'Last updated:  ' + timeString
    div.appendChild(lastUpdate)    
}
