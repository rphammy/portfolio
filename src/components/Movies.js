import React, { Component } from 'react';

const API_KEY = '1955a28a'
 
const IDS = [
	'tt0092067',
	'tt0095327',
	'tt0096283',
	'tt0097814',
	'tt0119698',
	'tt0245429',
	'tt0347149',
	'tt0876563',
	'tt0087544',
	'tt0495596',
	'tt1568921',
	'tt2013293',
	'tt3398268',

]

export class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: {
			}
		};
	}

	componentDidMount(){
		IDS.map((movieID) => (
			fetch('https://www.omdbapi.com/?i='+ movieID + '&apikey=' + API_KEY)
			.then(res => res.json())
			.then((data) => {
				this.setState(prevState => ({ 
					movies: {
						...prevState.movies,
						[movieID]: data
					} 
				}))
			})
			.catch(console.log)
		))
	}

	hideScroll(){
		const $body = document.querySelector('body');
		$body.style.overflow = 'hidden';
	}

	revealScroll(){
		const $body = document.querySelector('body');
		$body.style.overflow = 'auto';
	}

	render() {
		console.log(this.state.movies)
		let movies = Object.values(this.state.movies);
		movies.map((movie) =>(
			console.log(movie)
			))

		return (
			<div>
				<div class="header">
					<h1>Movies</h1>
				</div>
				<div>
					<section class="gallery">
						{movies.map((movie) =>{
							let hrefID = '#' + movie.Title;
							return (<a href={hrefID}>
								<img src={movie.Poster} onClick={this.hideScroll.bind(this)} width="300" height="400" alt={movie.Title}/>
							</a>)
						})}
					</section>
					{movies.map((movie) => (
						<a href="#" class="lightbox" onClick={this.revealScroll.bind(this)} id={movie.Title} >
						  	<img src={movie.Poster} alt={movie.Title}/>
						  	<p> Title: {movie.Title}</p>
						 	<p> Director: {movie.Director}</p>
							<p>IMDB Rating: {movie.imdbRating}</p>
						</a>
					))}

				</div>	
			</div>
		);
	}
}
export default Movies