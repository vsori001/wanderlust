// Foursquare API Info
const clientId = 'WZRXGF25UTGZ2B1LCCO0NHMGNL4T5LX14ZKIHSMMBP1SRBDS';
const clientSecret = '3CPVN2G42IKSOAMPQDFJKYWGX0N3RCUORWUYLTSWU11FNLBE';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// Try to grab the venues photos

// OpenWeather Info
const openWeatherKey = '9223879306508a4db13dbb2c146ba519';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async() => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200215`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(x => x.venue);
      console.log(venues);
      return venues;
    }
  }
  catch (error) {
    console.log(error);
  }
}

const getForecast = async() => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`
  try{
    const response = await fetch(urlToFetch);
    if( response.ok ) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  }
  catch(error) {
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    console.log(venueImgSrc);

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(function(venues){
    return renderVenues(venues);
  });
  getForecast().then(function(forecast) {
    return renderForecast(forecast);
  });
  return false;
}

$submit.click(executeSearch)
