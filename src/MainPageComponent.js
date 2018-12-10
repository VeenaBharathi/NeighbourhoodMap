import React, { Component } from 'react';
import FilterAreaComponent from './FilterAreaComponent';

class MainPageComponent extends Component {

   getGoogleMaps() {

  	/* global google */
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = 'AIzaSyB8b0BqRrPOoxj9EiiKP6SoQEhO-l9k3-s';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {

  	var markers = [];
    const locations = this.props.locations;

    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {

    	const map = new google.maps.Map(document.getElementById('map'), {
					zoom: 10
					});

	 	var marker1 = new google.maps.Marker({
            map: map })
	 	console.log(marker1.map)

    

        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].point;
          var title = locations[i].title;

          // console.log(position);
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          
          showListings();

          marker.addListener('click', function(){
            populateInfoWindow(this, new google.maps.InfoWindow())
          })
      }  

      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

      function populateInfoWindow(marker, infwindow) {
          if(infwindow.marker != marker) {
            infwindow.marker = marker;
            infwindow.setContent('<div>' + marker.title + '</div>');
            infwindow.open(map, marker);

            infwindow.addListener('closeclick', function(){
              infwindow.close(map, marker);
            })
          }

      }

    });
  }

  render = () => {

  const filterLoc = this.props.filterLoc;
  const locations = this.props.locations;

  	const styles = {
  		 width: '65%',
    	height: window.innerHeight,
    	float: 'right'
  	};
  	const fills = {
  		width: '35%',
    	height: window.innerHeight,
    	background:'#002',
      padding:'2%'
  	};

    const contains = {
        display:'flex'
    }

    return (

    	<div className="container" style={contains}>
	    	 <div id="filter" style={fills}>
          {
            <FilterAreaComponent 
            locations= {locations} 
            key={locations.id}
            filterLoc = {filterLoc}/>
          }
            
         </div>
	        <div id="map" style={styles}></div>
          }
        </div>
    
      
    )
  }
}  


export default MainPageComponent