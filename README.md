# Final-project
# Find tourist Attractions

## Open Trip Map API

This app uses the [Open Trip Map API](https://opentripmap.io/product) to gather data on local attractions in a city. Open Trip API allows for a developer to gather information such as the following:
* A city's central coordinates
* Attractions
  * Attraction image
  * Attraction name
  * Attraction description
  
For better search functionality, the user can refer to Open Trip Map API's [hierachy chart](https://opentripmap.io/catalog).

---------------

## Functionality of the App

In order to use this application, the user will need an access token from Open Trip Map. Once the user has the access token, they should follow these steps to receive the top 5 attractions in the genre they searched:

1. Input your access token
2. Input a valid city
3. Input an attraction type (museums, theaters, etc)
4. Input a radius in meters
5. Click 'search'

The user should see 5 attractions appear, displaying an image of the attraction, the attractions name, a small description of the attraction, and a 'learn more' button. If the user clicks on the 'learn more' button, it will take them to a wikipedia page dedicated to the attraction they clicked.

### Search Again Functionality

Once the user recieves the results of their first search, they can then click on the 'search again' button that will bring them back to the search fields. This allows the user to complete a different search.
