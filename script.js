const api = { // creates and object that will be used for our api fetch
    key: "b2ea5d8b5f7bf52bacf892f1e76efa3d",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box"); //Assigns a value to search-box
searchBox.addEventListener('keypress', setQuery); // From the search box listen for keypress run setQuery()

function setQuery(event){ // If enter is press store value in getResults()
    if(event.keyCode == 13){
        getResults(searchBox.value);
    }
}

function getResults(query){ //Passed value from search
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`) //Go fetch url based on api attributes 
    .then(weather => {  // Creates a function that is called weather that creates a JSON object declared as weather
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector(".city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`; // Grab city element and change text to update city and country

    let now = new Date(); // Creates a variable now that 
    let date = document.querySelector(".date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
}

function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}


