import React, { Component } from 'react';
import FilterAreaComponent from './FilterAreaComponent';

class MainPageComponent extends Component {

  state = {
    info : '',
    urlToTitle: ''
  }

  loadError(){

    window.gm_authFailure = () => { 
        alert("Authorization failure. Please check console log for details");
     }
  }  

  getGoogleMaps() {

  	/* global google */
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);
          // Tidyp
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        script.setAttribute("onerror", this.loadError);
        document.body.appendChild(script);
        const API = 'AIzaSyB8b0BqRrPOoxj9EiiKP6SoQEhO-l9k3-s';
        let domain = 'https://maps.googleapis.com/maps/api/js'
        script.src = `${domain}?key=${API}&callback=resolveGoogleMapsPromise`;
	script.onerror=alert("Error while accessing map");
        script.async = true;

        // Since maps API doesnt support fetch/ajax due ro CORS restriction, restricting domain className
        if(domain !== 'https://maps.googleapis.com/maps/api/js'){
          alert("Error with domain name details.");
        }
        
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
     this.loadError();
     this.getGoogleMaps();
  }

  componentDidMount() {
      // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps()
            .then((google) => {
                this.createMarkers();
                })
            .catch(function(){
                alert("error while creating markers");
                })
  }

  createMarkers = (loc) => {

    var currthis = this;

    var markers = [];
    const locations = this.props.locations;
    const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10
          });

    for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].point;
          var title = locations[i].title;

          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            // animation: animae
          });   

          // Push the marker to our array of markers.
          markers.push(marker);    
      } 

      markers.forEach(marker =>marker.addListener('click', function(){          
                  openModal(marker.title);
                  setTimeout(function() {
                    populateInfoWindow(marker, new google.maps.InfoWindow(), 
                      currthis.state.info, marker.title)
                    },500);
        }));

      markers.map(m => {
          if(loc){
              if(loc.title === m.title) {
                m.setAnimation (google.maps.Animation.BOUNCE);
                // let tempinfo = new google.maps.InfoWindow()
                // tempinfo.marker = m;
                // tempinfo.setContent('<strong>' + m.title + '</strong>' + '<div><strong>' + 'Click the marker to know more.' + '</div></strong>');
                // tempinfo.open(map, m);
                openModal(m.title);
                  setTimeout(function() {
                    populateInfoWindow(m, new google.maps.InfoWindow(), 
                      currthis.state.info, m.title)
                    },500);
              }
           }

          else {
          m.setAnimation ( google.maps.Animation.DROP );
          }

          return '';
      })

      showListings(markers, map);

        function populateInfoWindow(marker, infwindow, info, area) {

              let urlToTitle = `https://en.wikipedia.org/wiki/${area}`;

              if(infwindow.marker !== marker) {
                  infwindow.marker = marker;
                  infwindow.setContent('<strong>' + marker.title + '</strong>' 
                    + '<div><strong>' + marker.position + '</strong></div>'
                    + '<strong>' + info + '</strong>' 
                    + '<a href="' + urlToTitle + '">' + marker.title + ' wikipedia </a>');
                  infwindow.open(map, marker);

                  infwindow.addListener('closeclick', function(event){
                      infwindow.close(map, marker);
                    })
              }
        }

        function openModal (title) {

              const link = `https://en.wikipedia.org/w/api.php?format=json&exsentences=2&origin=*&action=query&prop=extracts&redirects=1&titles=${title}`;
              
              fetch(link)
              .then((response) => {
                if(!response.error){
                    response.json()
                          .then(res => {
                              let pageid = Object.keys(res.query.pages);
                              let info = res.query.pages[pageid[0]].extract;
                              currthis.setState({info: info});
                              return '';
                          })
                          .catch(function(){
                            alert("error while fetching json from response");
                          })
                }
              })
              .catch(function(){
                alert("error in fetching data from link");
              })
        }
  

  function showListings(markers, map) {
        var bounds = new google.maps.LatLngBounds();
        

        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          let mark = markers[i];
          mark.setMap(map);
          bounds.extend(mark.position);
        }
        map.fitBounds(bounds);

        // markers.forEach(marker =>marker.addListener('click', function(){          
        //           openModal(marker.title);
        //           setTimeout(function() {
        //             populateInfoWindow(marker, new google.maps.InfoWindow(), 
        //               currthis.state.info, marker.title)
        //             },500);
        // }));


  }
}


 render = () => {

  const filterLoc = this.props.filterLoc;
  const locations = this.props.locations;

	const styles = {
		width: '70%',
  	float: 'right'
	};

	const fills = {
		width: '30%',
  	height: window.innerHeight,
  	background:'#002',
    paddingLeft:'2%'
	};

  const contains = {
    display:'flex'
  };

  return (
          	<div className="container" style={contains}>
      	    	  <div id="filter" tabIndex="1" aria-label = "filterArea for locations" style={fills}>
                  {
                    <FilterAreaComponent 
                    locations= {locations} 
                    key={locations.id}
                    filterLoc = {filterLoc}
                    showOnlyMarkers={this.createMarkers}
                    />
                  }    
                </div>
      	        <div id="map" tabIndex="0" 
                role= "application" aria-label = "map with result locations" style={styles}></div>
            </div>  
          )
  }
}  

export default MainPageComponent
