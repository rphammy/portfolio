import React, { Component } from 'react';

export class Tab extends Component {
	addStyling = () => {
		if(this.props.tab.id === this.props.activeTab){
			return {color: 'white'}
		}
		else{
			return{color: '#546773'}
		}
	}
	render() {
		return (
			<div className='tab' 
			onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
				<p style={this.addStyling()}>{this.props.tab.title}</p>
			</div>
		);
	}
}

export default Tab;