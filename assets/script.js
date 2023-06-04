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



$(document).ready(function(){
  var today = dayjs();
  $("#current-day").text(today.format("dddd MMMM YYYY"));
  
  });

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
  $("current-city")
}

