var currentDate = moment().format("MMMM do YYYY");
var searchHistory = []
console.log(searchHistory)
var userInput = $('#userInput').val()


// function renderSearchHistory(){
//     searchHistoryContainer.innerHTML="";
    
//     for ( var i = searchHistory.length -1; i >= 0; i--){
//       var btn= document.createElement("button");
//       btn.setAttribute("type","button");
//       btn.setAttribute("aria-controls", "Today Forecast");
//       btn.classList.add("history-btn","btn-history");
//       btn.setAttribute("data-search",searchHistory[i]);
//       btn.textContent = searchHistory[i];
//       searchHistoryContainer.append(btn);
//     }
//     }
    
    
//     function addToHistory(search) {
//       if (searchHistory.indexOf(search) !== -1){
//       return;
//     }
//     searchHistory.push(search);
//     localStorage.setItem("search-history", JSON.stringify(searchHistory));
//     renderSearchHistory();
//     console.log(searchHistory);
//     }
    
    
//     function getSearchHistory(){
//       var storedHistory= localStorage.getItem("search-history");
    
//       if(storedHistory){
//         searchHistory=JSON.parse(storedHistory)
//       }
//       console.log(searchHistory);
//       renderSearchHistory();
//     }
    
    
//     // History Feature .. use local storage
//     getSearchHistory();


function getIcon(iconType) {
   return `https://api.openweathermap.org/img/w/${iconType}`
}

//SEARC
//grab values from search to use later in functions
$("#searchBtn").click(function (event){
    event.preventDefault();
    // renderSearchHistory();
    // addToHistory(searchHistory);
    // getSearchHistory();

    var userInput = $("#userInput").val();
    console.log(userInput);
    // addToHistory(userInput);

    // searchHistory.text(userInput + " " + currentDate);

    fetchLocation(userInput);

});

function fetchLocation(userInput) {
    //get some data pertaining to location -using api call
    // fetch Weather(data we recieved from fetchlocation)
    console.log(userInput)
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.8408&lon=-93.2983&units=imperial&appid=2b4f64abd099e1c41243e3911cd18532"
    )
        .then(function (response){
            return response.json()
        })
        .then(function (response) {
    
            console.log(response);
            var temp = response.main.temp; 
            var wind = response.wind.speed;
            var humidity = response.main.humidity;
            var city = response.name;
            var icon = getIcon(response.weather[0].icon)
            var time = moment(response.dt * 1000).format("MM/DD/YYYY");
            console.log(time)

            var imageTag = document.createElement("img");
            imageTag.setAttribute("src",icon);
        

            console.log("temp")
            $("#temp").text("");
            $("#temp").append(" ",temp, " F",imageTag);
            $("#wind").text(" "+wind+ " MPH");
            $("#humidity").text(" "+humidity+ "%");
            $("#city").text(" "+ city);
            $("#time").text(" "+ time);
        //need to get different api to get uv index specifically, not lat and long, still works
        fetch(
            "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat +
            "&lon=" + response.coord.lon + "&units=imperial&appid=2b4f64abd099e1c41243e3911cd18532")

            .then(function (response){
                return response.json()
            })
            .then(function (response) {
                console.log(response)

                var uvIndex = parseFloat(response.value);
                var $uv = $("#uv");
                $uv.append(" ",uvIndex);

                if (uvIndex <= 2) {
                    $uv.addClass("background-green")
                // $()
                }
                else if (uvIndex <= 5 ) {
                    $uv.addClass("background-yellow")
                }
                else if (uvIndex <=10 ) {
                    $uv.addClass("background-red")
                }

            });
            //forecast
        var cnt = 6;
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&cnt=" + cnt+ "&units=imperial&appid=c10bb3bd22f90d636baa008b1529ee25"
        ) 
        .then(function (response){
            return response.json()
        })
        .then(function (response) {
            console.log(response)

            for (var i = 1; i < response.list.length; i++) {
                var timeWeek = moment(response.list[i].dt * 1000).format("MM/DD/YYYY")
                console.log(timeWeek)

                $(`#timeWeek-${i}`).append(" ", timeWeek);
                var forecastImageTag = document.createElement("img");
                forecastImageTag.setAttribute("src",getIcon(response.list[i].weather[0].icon));
                $(`#temp-${i}`).append(" ",response.list[i].temp.day, " F", forecastImageTag);

                $(`#wind-${i}`).append(" ",response.list[i].speed, " MPH");

                $(`#humidity-${i}`).append(" ",response.list[i].humidity, "%");


            }
            

        })

        })
};