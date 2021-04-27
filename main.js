//delclare the input value
//declare the button that will be used to execute
const enterAPI = $(".search-button");

enterAPI.click(function() {
    const apiKey = $(".apikey-input").val();
    //test what details come with the data
    const cityInput = encodeURIComponent($('.city-input').val().toLowerCase());
    //uses inputs to finish fetch opentripmap url
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
            const attractionInput = $('.attraction-input').val().toLowerCase();
            //uses data from open trip map to gather get things within city centers radius
            fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${radiusInput}&lon=${coordinates[0]}&lat=${coordinates[1]}&kinds=${attractionInput}&rate=3&limit=5&apikey=${apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                // loops through the data to get wikidata id needed to get more information
                for (let i = 0; i < 5; i++) {
                    const wikiID = data.features[i].properties.wikidata;
                    //below will get the wikidata api data
                    fetch(`https://www.wikidata.org/wiki/Special:EntityData/${wikiID}.json`)
                        .then((res) => res.json())
                        .then((data) => {
                            // uses data from wikidata api to console log necessary information

                            //gets the name of the place
                            console.log("Attractions name: ")
                            console.log(data.entities[Object.keys(data.entities)[0]].labels.en.value)

                            // gets the wikidata description of the place
                            console.log("description: ")
                            console.log(data.entities[Object.keys(data.entities)[0]].descriptions.en.value)
                    
                            //gets the wikipedia url
                            console.log("Wikipedia Page: ")
                            console.log(data.entities[Object.keys(data.entities)[0]].sitelinks.enwiki.url)
                                
                            
                            
                        })
                }

            })
        })
        // $(".apikey-input").val("");
        // $(".apikey-input").attr("placeholder", "enter api key");
        // $('.main-section').addClass('hidden');
})

