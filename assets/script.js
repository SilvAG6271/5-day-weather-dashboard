let city = "";
let lat = "";
let lon = "";
let currentCity =$("#current-city");
let apiKey= "665c55f6299334252a52c0dc5a8d9a64";
let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
let searchCity = $("#search-city");
let searchBtn = $("#search-btn");
let future = $("#5-day-section");
let temp = $("#tempature");
let humidity = $("#humidity");
let uvIndex = $("#uvIndex");
let weather = $("#weather");
let wind = $("#wind");
let historyForm = $("#history-form");
let sCity = [];

 function find(c) {
    for (let i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
 }

 function currentWeather(event){
    event.preventDefault();
    if (searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        dsiplayWeather(city);
    }

 }
 function dsiplayWeather(city) {
    fetch(weatherURL, {
    //credentials: "include",
 })
 .then(function (response){
    return response.json();

   
})
.then(function(data){
    console.log(data);

let date = new Date (data.dt*1000).toLocalDateString();
$(currentCity).html(data.name + "("+date+")");
$(temp).html.toFixed(2);
$(humidity).html(data.main.humidity+"%");
let windS = data.wind.speed;
let windMPH = (windS*2.237).toFixed(1);
$(wind).html(windMPH + "MPH");
uvIndexCoords(data.coord.lon, data.coord.lat);
forecast(data.id);
if (response.cod === 200) {
    sCity=JSON.parse(localStorage.getItem("city name"));
    console.log(sCity);
    if (sCity==null){
        sCity=[];
        sCity.push(city.toUpperCase()
);
localStorage.setItem("city name", JSON.stringify(sCity));
addCity(city);
    } else {
        if(find(city)>0){
            sCity.push(city.toUpperCase());
            localStorage.setItem("city name", JSON.stringify(sCity));
            addCity(city);
        }
    }

}

});
}
 

function uvI(ln,lt){

    let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lt+"&lon="+ln;
fetch(uvURL)
.then(function(response){
    return response.json 
       
    
    
})
.then(function(data){
    console.log(data);
    $(uvIndex).html(data.value);  
}); }

function fiveDay(cityid){
    let dayOver = false;
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id="+ cityid +"&units=imperial&appid=" + apiKey;
    fetch(forecastURL)
.then(function(response){
    return response.json
})   

.then (function(data){
console.log(data);

for (i=0;i<5;i++){
let date = new Date((data.list[((i+1)*8)-1].dt)*1000).toLocalDateString();
//let iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
let humidity= data.list[((i+1)*8)-1].main.humidity;

$("#future-Date"+i).html(date);
$("#future-Img"+i).html("<img src="+iconurl+">");
$("#future-Temp"+i).html(tempF+"&#8457");
$("#future-Humidity"+i).html(humidity+"%");

}

});

}



function addList(c){
    let listEl = $("<li>" + c.toUpperCase()+"<li>");
    $(listEl).attr("class", "list-city");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".city-list").append(listEl);


}

function pastSearch(){
    let lineEl = event.target;
    if (event.target.matches("li")){
        city=lineEl.textContent.trim();
        dsiplayWeather(city);
    }
}

function lastCity(){
    $("ul").empty();
    let sCity = JSON.parse(localStorage.getItem("cityname"));
    if (sCity!==null){
        sCity=JSON.parse(localStorage.getItem("cityname"));
        for (i=0;i<sCity.length;i++){
            addList(sCity[i]);
        }
        city=sCity[i-1];
        dsiplayWeather(city);
    }
}

$("#search-btn").on("click",currentWeather);
$(document).on("click", pastSearch);
$(window).on("load", lastCity);

