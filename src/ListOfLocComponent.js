import React, { Component } from 'react';

class ListOfLocComponent extends Component {

	render(){
	     const location = this.props.loc;

	     const lists = {
	     	color:'white', 
	     	marginBottom:'10%',
	     }

	     return(
			
				<li style={lists}>{location.title}</li>
			
	     )
	}
}

export default ListOfLocComponent
