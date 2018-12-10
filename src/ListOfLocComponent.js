import React, { Component } from 'react';


class ListOfLocComponent extends Component {

	render(){
	     const location = this.props.loc;
	     const showOnlyMarkers = this.props.showOnlyMarkers;
	     // const openModal = this.prop.openModal;
	     // const icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

	     const lists = {
	     	color:'white', 
	     	marginBottom:'10%',
	     }

	     return(
			
				<li style={lists} 
				onClick={(event) => {
					showOnlyMarkers([location]) 						
				}}>{location.title}</li>
			
	     )
	}
}

export default ListOfLocComponent
