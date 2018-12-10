import React, { Component } from 'react';

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
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {

    	const map = new google.maps.Map(document.getElementById('map'), {
					zoom: 10,
					center: {lat: 20.5937, lng: 78.9629}
					});

	 	var marker1 = new google.maps.Marker({
            position: {lat: 20.5937, lng: 78.9629},
            map: map })
	 	console.log(marker1.map)

     	const locations = 
	      	[
	      	{title: "Hyderabad" , point: {lat: 17.3850, lng: 78.4867}},
	      	{title: "Jammu" , point: {lat: 32.7266, lng: 74.8570}},
			{title: "Kolkata" , point: {lat: 22.5726, lng: 88.3639}},
			{title: "Mumbai" , point: {lat: 19.0760, lng: 72.8777}},
			{title: "Jharkhand" , point: {lat: 23.6102, lng: 85.2799}}
			]



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
          console.log(marker.map);
          showListings();
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

    });
  }

  render() {

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
        display:'flex',
        text:'center'
    }

    return (
    	<div className="container" style={contains}>
	    	 <div id="filter" style={fills}>
            <h2 style={{color: 'white'}}> Locations </h2>
            <div className="container" style={contains}>
            <span><input type='text' placeholder="Search by location"/></span>
            <span><button>Filter</button></span>
            </div>
            
         </div>
	        <div id="map" style={styles}></div>
        </div>
      
    )
  }
}  


export default MainPageComponent