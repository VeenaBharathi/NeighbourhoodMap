import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import MainPageComponent from './MainPageComponent'

class App extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    locations:[
      {id:'1', title: "Hyderabad" , point: {lat: 17.3850, lng: 78.4867}},
      {id:'2', title: "Jammu" , point: {lat: 32.7266, lng: 74.8570}},
      {id:'3', title: "Kolkata" , point: {lat: 22.5726, lng: 88.3639}},
      {id:'4', title: "Mumbai" , point: {lat: 19.0760, lng: 72.8777}},
      {id:'5', title: "Jharkhand" , point: {lat: 23.6102, lng: 85.2799}}
      ]
  }


  filterLoc = (locations, val) => {

    var allLoc = [
      {id:'1', title: "Hyderabad" , point: {lat: 17.3850, lng: 78.4867}},
      {id:'2', title: "Jammu" , point: {lat: 32.7266, lng: 74.8570}},
      {id:'3', title: "Kolkata" , point: {lat: 22.5726, lng: 88.3639}},
      {id:'4', title: "Mumbai" , point: {lat: 19.0760, lng: 72.8777}},
      {id:'5', title: "Jharkhand" , point: {lat: 23.6102, lng: 85.2799}}
      ];
    var filteredLoc = allLoc.filter(loc => {return loc.title.toLowerCase().includes(val.toLowerCase())});
    
    this.setState({locations: filteredLoc});
  }


// defining routes '/' to main page and '/search' to search page
  render() {
    return  (
       <div className="App" tabIndex="1" aria-label="Neighbourhood Map application">
          <Route exact path="/" render={() => (
              <MainPageComponent 
                  locations={this.state.locations} 
                  filterLoc = {this.filterLoc}
                  />
              )}
          />
        </div>    
    )
  }
}

export default App