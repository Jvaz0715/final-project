//delclare the input value
//declare the button that will be used to execute
const enterAPI = $(".search-button");

enterAPI.click(function() {
    const apiKey = $(".apikey-input").val();
    //test what details come with the data
    const cityInput = encodeURIComponent($('.city-input').val().toLowerCase());
    //using USA as example, fetch the url
    fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${cityInput}&apikey=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
        console.log(data)
        // console.log("This is the latitude: " + data.lat);
        // console.log("This is the latitude: " + data.lon);

        const latitude = data.lat;
        const longitude = data.lon;
        const coordinates = [longitude, latitude];
        return coordinates;
        })
        .then((coordinates) => {
            const radiusInput = $('.radius-input').val();
            const attractionInput = $('.attraction-input').val().toLowerCase();

            fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${radiusInput}&lon=${coordinates[0]}&lat=${coordinates[1]}&kinds=${attractionInput}&rate=3&limit=5&apikey=${apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                console.log(data.features.length);
                console.log(data.features[0])
                // this will target the name of the museums
                // console.log(data.features[0].properties.name)

                for (let i = 0; i < 1; i++) {
                    console.log(data.features[i].properties.name)
                    console.log(data.features[i].properties.kinds)
                    //below will give you the wikidata id needed for another fetch that will get you the descriptions of the place
                    // console.log(data.features[i].properties.wikidata)
                    const wikiID = data.features[i].properties.wikidata;
                    //below will get the wikidata api stuff
                    fetch(`https://www.wikidata.org/wiki/Special:EntityData/${wikiID}.json`)
                        .then((res) => res.json())
                        .then((data) => {
                            // uses fetch to get the zoos description from wikidata!
                            console.log(data.entities[Object.keys(data.entities)[0]].descriptions.en.value)
                            //trying to get the wikipedia page
                            console.log(data.entities[Object.keys(data.entities)[0]].sitelinks.enwiki.url)
                        })
                }

            })
        })
        // $(".apikey-input").val("");
        // $(".apikey-input").attr("placeholder", "enter api key");
        // $('.main-section').addClass('hidden');
})

