import React, { Component } from 'react';

class ListOfLocComponent extends Component {

	render(){
	     const locations = this.props.locations;

	     const lists = {
	     	color:'white', 
	     	marginBottom:'10%',
	     }

	     return(
			locations.map(loc => {
				return <li style={lists}>{loc.title}</li>
			})
	     )
	}
}

export default ListOfLocComponent
