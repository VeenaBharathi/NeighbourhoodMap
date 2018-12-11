# Neighbourhood Map Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Third Party API used
MediaWiki API by Wikipedia
(Refer to https://www.mediawiki.org/wiki/API:Query for info regarding API used)

## Instructions

Project Title
* This is a project to search for available locations on map and their information. USers can filter the locations they wish to view on map and click the locations in list to view the highlighted marker on map. When clicked on marker, info regarding the location is fethced from wikipedia using MediaWiki API and displayed n the info window. User is also provided with a link to navigate to the wikipedia page of the location.

Getting Started
* The code can be downloaded from following git hub location-
https://github.com/VeenaBharathi/NeighbourhoodMap.git

Prerequisites
* Git Bash
* Browser
* Sublime Test2

Install steps
* git clone <above repository> into any local folder.
* Run npm install, npm install react-router-dom, npm install react-route and the application is ready to use.

Instructions

1.he page has filter area and map area.

2.Filter area by default displays the list of locations that user can find on the map.
Map area has all the markers corresponding to the available locations on load.

3.User can type into search input and narrow down the loctaion options. Clicking on filter button will open the result locations' markers on the map.
  
4.User may click on the result locations to view the specific location highlighted in the map among other locations with location name in the info window.

5.Clicking on the marker presents user with info regarding the location fetched from Wikipedia using MediaWiki API along with link to navigate to original wikipedia page of the location. 

Built With
* Sublime Text Editor

## Offline Availability
Service worker is auto created since the app is created using create-react-app. It will be unregistered by default. The index.js file is modified to register the service worker which works only in production mode. Refer deploy application to production section to learn about production deployment.

## Deploy Application To Production using Heroku
1.Once app is ready created using create-react-app, add your own app icon to the Public folder.
2.Create an Express JS server to serve your production build.
3.Create a React production build with 'npm run build'
4.Deploy application
[For detailed steps, refer - https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08]


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
