import React, { Component } from 'react';
import spotify from '../images/spotify.png'
import scraps from '../images/scraps.png'

export class Projects extends Component {
	render() {
		return (
			<div>
				<div class="header">
					<h1>Gallery</h1>
				</div>

				<div class="list">
					<div class="project">
						<a href="https://github.com/rphammy/Spartify">
							<img class="project__img"src={spotify} width="200" height="200" alt="spotify"/>
						</a>
						<a class="project__text"href="https://github.com/rphammy/Spartify">
							Spartify: A Shared Spotify App
						</a>
					</div>
					<div class="project">
						<iframe width="350" height="200" src="https://www.youtube.com/embed/FE_yc1LtAfE" frameborder="0" allowfullscreen title="brainmuse"></iframe>
						<a class="project__text" href="https://github.com/rphammy/BrainMuse">
							BrainMuse: Turning Brainwaves into Art
						</a>
					</div>		
					<div class="project">
						<a href="https://scrapstosnacks.herokuapp.com/">
							<img class="project__img"src={scraps} width="220" height="200" alt="scraps"/>
						</a>
						<div class="project__text">
							<div>
								<a href="https://scrapstosnacks.herokuapp.com/">
									ScrapsToSnacks: Ingredients to Recipes
								</a>
							</div>
							<div>
								<a href="https://github.com/rphammy/ucsb-cs56-scrapstosnacks">
									Github
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Projects;