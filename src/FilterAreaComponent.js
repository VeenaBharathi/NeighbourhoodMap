import React, { Component } from 'react';
import ListOfLocComponent from './ListOfLocComponent';

class FilterAreaComponent extends Component {

	render(){
     const locations = this.props.locations;

			return (
			<div>
				<h1 style={{color: 'white'}}> Locations </h1>

	            <div style={{display:'flex', textAlign: 'center'}}>
	                <span><input type='text' placeholder=".. type to search"	/></span>
	                <span><button>Filter</button></span>
	            </div>

	            <ul style={{listStyleType:'none', paddingInlineStart:'0'}}>
	            {
					locations.map(loc => {
						return (<ListOfLocComponent 
							loc={loc} 
							key={loc.id}
						/>)
					})		
	            }
	            		            			
	            </ul>
            </div>
            
			)
	}


}

export default FilterAreaComponent