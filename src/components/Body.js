import React, { Component } from 'react';
import Home from './Home'
import Projects from './Projects'
import Gallery from './Gallery'
import Contact from './Contact'

export class Body extends Component {
	displayContent = () => {
		var activeTab = this.props.activeTab
		if(activeTab === 1)
			return <Home/>
		else if(activeTab ===2)
			return <Projects/>
		else if (activeTab===3)
			return <Gallery/>
		else
			return <Contact/>
	}
	render() {
		return (this.displayContent());
	}
}

export default Body;