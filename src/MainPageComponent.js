import React, { Component } from 'react';
import FilterAreaComponent from './FilterAreaComponent';

class MainPageComponent extends Component {

  state = {

    info : ''
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
      // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
// console.log(this)
      this.createMarkers();
    });
  }

  
  createMarkers = (loc) => {

    var markers = [];    
    const locations = loc || this.props.locations;
    
    // console.log(this);

    const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10
          });
// console.log(locations.length);



        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].point;
          var title = locations[i].title;

          // console.log(locations.length);
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          
          
      } 
      this.showListings(markers, map);
    }

  showListings(markers, map) {
        var bounds = new google.maps.LatLngBounds();
        var currthis = this;

        

        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          let mark = markers[i];
          mark.setMap(map);
          bounds.extend(mark.position);
        }
        map.fitBounds(bounds);


          markers.forEach(marker =>marker.addListener('click', function(){
            
            openModal(marker.title);
             // console.log("returned");
             setTimeout(function() {
              populateInfoWindow(marker, new google.maps.InfoWindow(), currthis.state.info)
           },500);

             
          }));

  function populateInfoWindow(marker, infwindow, info) {
  console.log("populating infwindow for location" + marker.title);



          if(infwindow.marker !== marker) {
            infwindow.marker = marker;
            // console.log("--------" + info);
            infwindow.setContent('<strong>' + marker.title + '</strong>' 
              + '<div><strong>' + marker.position + '</strong></div>'
              +  '<strong>' + info + '</strong>'  );
            // infwindow.setContent();
            infwindow.open(map, marker);

        infwindow.addListener('closeclick', function(event){
            console.log("adding listsner for " + marker.title);
              infwindow.close(map, marker);

              })
          }

      }

  function openModal (title) {

      // console.log("In open modal for location: " + title);

    // const link = `https://en.wikipedia.org/w/api.php?action=opensearch&mode=no-cors&format=json&search=${location.title}`;
    // link.mode='no-cors';
    const link = `https://en.wikipedia.org/w/api.php?format=json&exsentences=2&origin=*&action=query&prop=extracts&redirects=1&titles=${title}`
    // console.log("Fetching data at link: " + link);
    // link.setRequestHeader("Origin", "http://localhost:3000/");
    fetch(link).then((response) => {
      if(!response.error){
          response.json().then(res => {
            
                let pageid = Object.keys(res.query.pages);
          
      let info = res.query.pages[pageid[0]].extract
      // console.log(new DOMParser().parseFromString(info, "text"));
    // let win = window.open();
    // win.document.body.innerHTML = info;
    // return "100";
    // console.log("this here is = " + currthis);
    currthis.setState({info: info});
    // console.log("state of info: " + currthis.state.info)
   
 // console.log("returning");
    return '';

      })
    }

  })
  }
    }


//   openModal = (location) => {

//     // const link = `https://en.wikipedia.org/w/api.php?action=opensearch&mode=no-cors&format=json&search=${location.title}`;
//     // link.mode='no-cors';
// const link = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=1&titles=${location.title}`
//     // console.log("Fetching data at link: " + link);
//     fetch(link).then((response) => {
//       if(!response.error){
//           response.json().then(res => {
            
//                 let pageid = Object.keys(res.query.pages);
          
//       let info = res.query.pages[pageid[0]].extract
//       console.log(info);
//           // })
//       })
//     }

//   })
//   }


 


 render = () => {

  const filterLoc = this.props.filterLoc;
  const locations = this.props.locations;
  // const showOnlyMarkers = this.props.showOnlyMarkers;

  	const styles = {
  		 width: '65%',
    	height: window.innerHeight,
      // height:'100%',
    	float: 'right'
  	};
  	const fills = {
  		width: '35%',
    	height: window.innerHeight,
      // maxHeight:'100%',
    	background:'#002',
      padding:'2%'
  	};

    const contains = {
        display:'flex'
    }

    // const modal = {
    // position: 'fixed',
    // fontFamily: 'Arial, Helvetica, sans-serif',
    // top: '0',
    // left: '0'
    // background: 'rgba(0, 0, 0, 0.8)',
    // height: '50%';
    // width: '100%';
    // }

    return (

    	<div className="container" style={contains}>
	    	 <div id="filter" style={fills}>
          {
            <FilterAreaComponent 
            locations= {locations} 
            key={locations.id}
            filterLoc = {filterLoc}
            showOnlyMarkers={this.createMarkers}
            // openModal={this.openModal }
            />
          }
            
         </div>
	        <div id="map" style={styles}></div>
          
         
          
        </div>
    
      
    )
  }
}  


export default MainPageComponent