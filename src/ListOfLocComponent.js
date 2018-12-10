import React, { Component } from 'react';


class ListOfLocComponent extends Component {

	render(){
	     const location = this.props.loc;
	     const showOnlyMarkers = this.props.showOnlyMarkers;

	     const lists = {
	     	color:'white', 
	     	marginBottom:'10%',
	     }

	     return(
			<div style={lists} tabIndex="4" role="button" onClick={(event) => {showOnlyMarkers(location) }}>
					{location.title}
			</div>
		  )
	}
}

export default ListOfLocComponent
