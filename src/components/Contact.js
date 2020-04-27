import React, { Component } from 'react';
import me from '../images/me_cute.png'
import gmail from '../images/gmail.png'
import linkedin from '../images/linkedin.png'
import github from '../images/github.png'

export class Contact extends Component {
	render() {
		return (
			<div>
				<div class="header">
					<h1>Contact</h1>
				</div>	

				<div class="main-body">
					<div class="img_box">
						<img src={me} width="550" height="400"/>
					</div>
					<div class="text_box">
						<h3>
							Get In Touch
						</h3>
						<p>
							Want to chat? My inbox is always open or reach out to me on social media! 
						</p>
						<a href="mailto: rpham@ucsb.edu">
							<img src={gmail} width="50" height="50"/>
						</a>
						<a href="https://www.linkedin.com/in/rphammy/">
							<img src={linkedin} width="50" height="50"/>
						</a>
						<a href="https://github.com/rphammy">
							<img src={github} width="50" height="50"/>
						</a>

					</div>
				</div>
			</div>
		);
	}
}
export default Contact;