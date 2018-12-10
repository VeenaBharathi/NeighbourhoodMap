import React, { Component } from 'react';
import ListOfLocComponent from './ListOfLocComponent';

class FilterAreaComponent extends Component {

	render(){
     const locations = this.props.locations;

			return (

			<div>
				<h2 style={{color: 'white'}}> Locations </h2>

	            <div style={{display:'flex'}}>
	                <span><input type='text' placeholder="Search by location"/></span>
	                <span><button>Filter</button></span>
	            </div>

	            <ul style={{listStyleType:'none', paddingInlineStart:'0'}}>
	            {
					<ListOfLocComponent locations={locations}/>
						
	            }
	            		            			
	            </ul>
            </div>
            
			)
	}


}

export default FilterAreaComponent