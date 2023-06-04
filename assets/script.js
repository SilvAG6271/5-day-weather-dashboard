let city = $("searchCity").val();
let lat = "";
let lon = "";
let currentCity =$("current-city");
const apiKey= "0add977b895357f4ff61a3e93333b72d";

const searchCity = $("searchCity");
let searchBtn = $("searchBtn");
let tomorrow = dayjs().day(0);
let future = $("5-day");
let temp = $("temp");
let humidity = $("humidity");
let uvIndex = $("uvIndex");
let weather = $("weather");
let wind = $("wind");





  function saveCity (cityInput) {
    var inputSaved = JSON.parse(localStorage.getItem("searchBtn")) || [];
    inputSaved.push(cityInput);
    localStorage.setItem("searchBtn", JSON.stringify(inputSaved));
  }

  function renderSave(){
    let inputSaved = JSON.parse(localStorage.getItem(searchBtn)) || [];

    $("history").innerHTML = "";
    inputSaved.forEach(function(searchedCity){
      let cityHistoryBtn = $("history").append("button");
      cityHistoryBtn.innerHTML = searchedCity
    
    })


  }
   function getWeather (cityName) {
    let weatherURL = "api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}"; 
   

  fetch(weatherURL, {
  method: 'GET', 
  credentials: 'include',
})

.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.assert.log(data);
  showCurrent(cityName, data);

  let fiveDayURL = "api.openweathermap.org/data/2.5/necall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}";
  fetch(fiveDayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function(fiveDayData){
      console.log(fiveDayData);
      showFiveWeather(fiveDayData);
    });
});

   }
function showCurrent(cityName, data) {
  $("current-day").innerHTML = dayjs().format("dddd MMMM YYYY");
  $("weather").innerHTML = data.weather[0].description;
  $("current-city").innerHTML = cityName;
  $("tempature").innerHTML = Math.round(data.main.temp) + "F";
  $("humidity").innerHTML = data.main.humidity + "%";
  $("wind").innerHTML = Math.round(data.wind.speed) + "mph";

  }

  function FiveWeather(data) {
    // Grabs UVI info from 5-day forecast API
    let currentUVI = ($("UVIindex").innerHTML = Math.round(data.current.uvi));

    // Set loop for 5-day weather
    $("5-day-section").innerHTML = "";
    for (var i = 0; i < 5; i++) {
      let forecastDates = dayjs()
        .add(i + 1, "days")
        .format("ddd MM/DD/YYYY");
      // Build HTML from js for 5-day forecast
      let day = $("div");
      day.innerHTML = [
        `<h5>${forecastDates}</h5>
      <img src="https://openweathermap.org/img/wn/${
        data.daily[i].weather[0].icon
      }@2x.png">
      <p>${data.daily[i].weather[0].description}</p>
      <p>Temperature: ${Math.round(data.daily[i].temp.day)}°F</p>
      <p>Humidity: ${data.daily[i].humidity}%</p>`,
      ];
      document.querySelector("5-day-section").appendChild(day);
    }
    uviBadge(data);
    $("#card-text").empty();
  }



