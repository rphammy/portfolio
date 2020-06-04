import React, { Component } from 'react';
import './App.css'
import TabList from './components/TabList'
import Body from './components/Body'

export class App extends Component {

	constructor(){
		super();
		this.state = {
			activeTab: 1,
			data: {}
		}
		this.changeTab = (id) => {
			this.setState({
				activeTab: id
			})
		}
	}


  	render() {
	  	const tabs = [
	  	{
	  		id: 1,
	  		title: 'Home'
	  	},
	  	{
	  		id: 2,
	  		title: 'Projects'
	  	},
	  	{
	  		id: 3,
	  		title: 'Gallery'
	  	},
	  	{
	  		id: 4,
	  		title: 'Movies'
	  	},
	  	{
	  		id: 5,
	  		title: 'Add Movie'
	  	},
	  	{
	  		id: 6,
	  		title: 'Create List'
	  	},
	  	{
	  		id: 7,
	  		title: 'Graph'
	  	},
	  	{
	  		id: 8,
	  		title: 'Contact'
	  	},
	  	{
	  		id: 9,
	  		title: 'Say Hi'
	  	},

	  	]    
	  	return (
	      <div className="body">
	      	<div className="nav-bar">
	      		<TabList tabs={tabs} 
	      		changeTab={this.changeTab}
	      		activeTab={this.state.activeTab}/>
	      	</div>
	      	<div className="main-body">
	      		<Body activeTab={this.state.activeTab}/>
	      	</div>

	      </div>
	    );
  	}
}

export default App;