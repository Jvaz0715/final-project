//declare the button that will be used to execute
const searchButton = $(".search-button");

//Create click function for fetches
searchButton.click(function() {
    const apiKey = $(".apikey-input").val();
    //test what details come with the data
    const cityInput = encodeURIComponent($('.city-input').val().toLowerCase());
    //uses inputs to finish fetch opentripmap url
    // First fetch is to get the city’s center point coordinates:
    fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${cityInput}&apikey=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
        //uses data from open trip map to gather coordinates
        const latitude = data.lat;
        const longitude = data.lon;
        const coordinates = [longitude, latitude];
        return coordinates;
        })
        .then((coordinates) => {
            const radiusInput = $('.radius-input').val();
            const attractionInput = $('.attraction-input').val().toLowerCase().replace(" ", "_");
            //uses data from open trip map to gather get things within city centers radius
            fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${radiusInput}&lon=${coordinates[0]}&lat=${coordinates[1]}&kinds=${attractionInput}&rate=3&limit=5&apikey=${apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                // loops through the data to get wikidata id needed to get more information
                for (let i = 0; i < 5; i++) {
                    const xID = data.features[i].properties.xid;
                    console.log(data.features[i].properties.xid)
                    //uses xid to create new url to fetch new data from open map api
                    fetch(`https://api.opentripmap.com/0.1/en/places/xid/${xID}?apikey=${apiKey}`)
                        .then((res) => res.json())
                        .then((data) => {
                            createCard(data)
                        })
                }
            })
        })
        // $(".apikey-input").val("");
        // $(".apikey-input").attr("placeholder", "enter api key");
        //will hide the search container on click
        $('.input-container').addClass('hidden');
        $('.search-again-container').removeClass('hidden');
})



//function that will create card using the last fetch's data
function createCard(data) {
    console.log(data)
    //will get you the name of the attraction
    console.log("Attraction Name: " + data.name)

    //this will give you an image url for the place
    console.log("image url: " + data.image);
    
    //this will give you a description of the place
    //must shorten it as text lengths vary
    console.log("Wiki description: " + data.wikipedia_extracts.text); 
    
    //this will get you the wikipedia page to the place
    console.log("wikipedia page: " + data.wikipedia);
    const resultsDisplay = $('.results-display');

    let attractionDescription = data.wikipedia_extracts.text;

    //if...else statement that shortens the text to 280 characters or less
    if(attractionDescription.length > 280){
       attractionDescription = attractionDescription.substring(0,280) + "..."; 
    } else {
        attractionDescription;
    }
    
    //uses jquery to create a new attraction card to display;
    const newAttraction = $(`
    <div class="card card-extras" style="width: 18rem;">
    <img class="card-img-top card-image" src="${data.preview.source}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <div class="favorite-icon"><img src="assets/favorite.png" class="fave-me"></div>
            <p class="card-text">${attractionDescription}</p>
            <a href="${data.wikipedia}" target="_blank" class="btn btn-primary">Learn More</a>
        </div>
    </div>`)
    resultsDisplay.append(newAttraction);
}

//search again button that will reset everything and produce new results each time
const searchAgain = $('.search-again-container');
searchAgain.click(function() {
    //brings back the original search container
    $('.input-container').removeClass('hidden');
    
    //empties the result container
    $('.search-again-container').empty();
    
    //Recreates and appends the search again button and the results display that were "emptied" above
    const newSearchAgain = $('<div class="search-again-button">Search Again</div>');
    const resultsDisplay = $('<div class="results-display"></div>');
    $('.search-again-container').append(newSearchAgain);
    $('.search-again-container').addClass('hidden');
    $('.search-again-container').append(resultsDisplay);

    //Resets all the inputs from previous search
    $(".apikey-input").val("");
    $(".apikey-input").attr("placeholder", "enter api key");
    $(".city-input").val("");
    $(".city-input").attr("placeholder", "City Name");
    $(".attraction-input").val("");
    $(".attraction-input").attr("placeholder", "Attraction");
    $(".radius-input").val("");
    $(".radius-input").attr("placeholder", "Distance");
})