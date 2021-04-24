// test what details come with the data

// using USA as example, fetch the url
// fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=san%20diego&apikey=${/*apikey*/}`)
//     .then((res) => res.json())
//     .then((data) => {
//         // console.log(data)
//         // console.log("This is the latitude: " + data.lat);
//         // console.log("This is the latitude: " + data.lon);

//         const latitude = data.lat;
//         const longitude = data.lon;
//         const coordinates = [longitude, latitude];
//         return coordinates;
//     })
//     .then((coordinates) => {
//         fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=8050&lon=${coordinates[0]}&lat=${coordinates[1]}&kinds=museums&rate=3&limit=10&apikey=${/*apikey*/}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data.features.length);
//                 console.log(data.features[0])
//                 // this will target the name of the museums
//                 console.log(data.features[0].properties.name)

//                 for (let i = 0; i < data.features.length; i++) {
//                     console.log(data.features[i].properties.name)
//                 }
//             })
//     })


console.log(numbers)

const greeting = $('<h1></h1>').text(greet);

$('.body').append(greeting)