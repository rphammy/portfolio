import React, { Component } from 'react';

export class Tab extends Component {
	addStyling = () => {
		if(this.props.tab.id == this.props.activeTab){
			return {backgroundColor: '#A8D0E6'}
		}
		else{
			return{backgroundColor: '#374785'}
		}
	}
	render() {
		return (
			<div className='tab' 
			style={this.addStyling()}
			onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
				<p>{this.props.tab.title}</p>
			</div>
		);
	}
}

export default Tab;