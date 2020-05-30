import React, { Component } from 'react';
import me from '../images/me.png'

export class Home extends Component {
	render() {
		return (
			<div>
				<div className="header">
					<h1>Welcome to my portfolio page!</h1>
				</div>

				<div className="main-body">
					<div className="img_box">
						<img src={me} width="375" height="500" alt="me"/>
					<div/>
					<div className="text_box">
						<h3>
							Rachel Pham
						</h3>
						<p>
							I am a graduating senior in Computer Science at the University of California, Santa Barbara interested in Software Engineering. 
						</p>
					</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Home;