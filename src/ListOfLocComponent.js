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
			<li style={lists} onClick={(event) => {showOnlyMarkers(location) }}>
					{location.title}
			</li>
		  )
	}
}

export default ListOfLocComponent
