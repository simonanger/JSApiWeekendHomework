
var url = "https://restcountries.eu/rest/v2/all";
var url2 = "http://ron-swanson-quotes.herokuapp.com/v2/quotes"

var makeRequest = function() {
  var mapDiv = document.getElementById('main-map');
  var center = {lat: 51.5074, lng: -0.1278};
  mainMap = new MapWrapper(mapDiv, center, 5);
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function() {
    countries = JSON.parse(this.responseText);
    render(countries)
    console.log(countries);
  })
  request.send()
}

var makeRonRequest = function() {
  var h2 = document.getElementById("quote")
  var request = new XMLHttpRequest();
  request.open("GET", url2);
  request.addEventListener("load", function() {
    quote = JSON.parse(this.responseText);
    h2.innerText = "'"+ quote[0] + "'"  + " -Ron Swanson";
  })
  request.send();
}

var render = function(countries) {
  for (country of countries) {
    var select = document.getElementById("list");
    var option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
    var dropDown = document.getElementById("list");
    dropDown.addEventListener("change", handleSelectChange);
  }
}

var handleSelectChange = function(event) {
  var country = countries[event.target.selectedIndex -1];
  var dropDown = document.querySelector("select");
  updateCountryDetails(country)
}

var updateCountryDetails = function(country) {
  var name = document.getElementById("name");
  var population = document.getElementById("population");
  var chosenLatLng = {lat: country.latlng[0], lng: country.latlng[1]}
  // var chosenLat = country.latlng[0];
  // var chosenLng = country.latlng[1];
  console.log(chosenLatLng);
  name.innerText = "Name: " + country.name;
  population.innerText = "Population: " + country.population;
  mainMap.googleMap.setCenter(chosenLatLng)
  mainMap.addMarker(chosenLatLng);
}
window.addEventListener("load", makeRequest)
window.addEventListener("load", makeRonRequest)
