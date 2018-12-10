import React, { Component } from 'react';
import ListOfLocComponent from './ListOfLocComponent';

class FilterAreaComponent extends Component {

	render(){
     const locations = this.props.locations;
     const filterLoc = this.props.filterLoc;
     const showOnlyMarkers = this.props.showOnlyMarkers;
			

	 return (
			<div>
				<h1 style={{color: 'white'}} aria-label = "locations" tabIndex="1"> Locations </h1>

	            <div style={{display:'flex', textAlign: 'center'}}>
	                <span>
		                <input name="start typing to search" tabIndex= "2" id="userValue" type='text' placeholder=".. type to search" 
		                onChange={(event) => { filterLoc(locations, event.target.value.trim()) }}
	                     />
                     </span>
	                <span><button aria-label = "Click to filter result locations in map" tabIndex="5" onClick={(event) => {showOnlyMarkers()}}>
	                     	Filter</button></span>
	            </div>

	            <ul tabIndex="3" aria-label = "results list. Click on required location to view on map" role="tree" style={{listStyleType:'none', paddingInlineStart:'0'}}>
	            {
					locations.map(loc => {
						return (<ListOfLocComponent 
							loc={loc} 
							key={loc.id}
							showOnlyMarkers={showOnlyMarkers}
						/>)
					})		
	            }		            			
	            </ul>
            </div>
            
			)
	}


}

export default FilterAreaComponent