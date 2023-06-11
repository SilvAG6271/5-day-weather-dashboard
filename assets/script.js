let searchCity = $("#search-city")
let currentCity =$("#current-city");
const apiKey= "665c55f6299334252a52c0dc5a8d9a64";
const date = dayjs();
let searchBtn = $("#search-btn");
let future = $("#5-day-section");
let temp = $("#current-tempature");
let humidity = $("#current-humidity");
let uvIndex = $("#uvIndex");
let weather = $("#weather");
let wind = $("#wind");
let cityLocation = [];
icon = "";

function getWeather(){
    let currentUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+ "&units=imperial";
    fetch(currentUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        icon = data.weather[0].icon;
        temp = data.main.temp;
        wind = data.wind.speed;
        humidity = data.main.humidity;


    })

    .then(function(data) {
        displayCurrent()
        displayForecast()
    })
}

function displayCurrent(){
    let currentDate = today.format (mm, dd, yyyy);
    $("current-city").text(city + "," + currentDate);
    $("current-icon").attr("https://openweathermap.org/img/wn/' + ico + '@2x.png");
    $("current-tempature").text(temp);
    $("current-humidity").text(humidity + "%");
}


function addCity(){
    let newCity = JSON.parse(window.localStorage.getItem("city name"));

    $(".city-list").empty();
    for (i in newCity) {
        let cityButton = "";
        cityButton += "<button id='" + newCity[i].city + 'class="btn">' + newCity[i].city + "</button>";
    }
}

function displayForecast(){
    let forecastURL = "https//api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=imperial";
    fetch(forecastURL)
    .then (function(response){
        return response.json();

    })
    .then (function(data){
      let index = 1;
      for (i=0; i< data.list.length; i+=8) {
        let futureDate = today.add(index, "d").format("mm, dd, yyyy");
        $("future-date").text(futureDate);
        $("future-img").attr("src", "https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png");
        $("future-tempature").text(data.list[i].main.temp);
        $("future-wind").text(data.list[i].wind.speed);
        $("future-humidity").text(data.list[i].main.humidity);
        index++;
}
})
}

    function citySearch(){
    city = searchCity.val();
    if (city!==""){
        city = city.charAt(0).toUpperCase() + city.slice(1);
        let newCity = {
            city: city,
        }
        cityLocation.push(newCity);
        localStorage.setItem("city name", JSON.stringify(cityLocation));
   
    }
    getWeather();
    addCity();
}

 searchBtn.click(citySearch);

 $("city-list").on("click", function(event) {
    let cityId= $(event.target).attr("id");
    let tempatureArr= cityId.split("-");
    city = tempatureArr[0];
    getWeather();

 });