import React, { Component } from 'react';
import config from '../firebase.js';
import Dropdown from './Dropdown';

const firebase = require('firebase');
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
	constructor() {
		super();
		this.state = {
			movies: [],
			currentMovie: '',
			filtered: [],
			view: 8,
			currentListName: 'All',
			lists: [],
			currentLists: [],
			display: [],
			listsToAddTo: [],
			loadMore: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
	    /* Create reference to messages in Firebase Database */
	    if(!firebase.apps.length) {
	    	firebase.initializeApp(config);
		}
		let movies={};

	    const moviesRef = firebase.database().ref('movies').orderByChild('Title');
	    moviesRef.on('value', snapshot => {
	    	snapshot.forEach(m => {
	    		let i = m.val();
	    		let imdbID = i.imdbID;

	    		this.setState(prevState => ({
	      			movies: {
	      				...prevState.movies,
	      				[imdbID]: i
	      			},
	      			display: {
	      				...prevState.movies,
	      				[imdbID]: i
	      			}
	     		}));
	    	});

			let moviesLength = Object.keys(this.state.display).length;
	    	if(moviesLength > 8){
	    		console.log("hi")
	    		this.setState({
	    			loadMore: true
	    		}); 
	    	}
	    });

	    let newListsState = [];
    	const listsRef = firebase.database().ref('lists');
      	listsRef.on('value', snapshot => {
	      	const lists = snapshot.val();
	      	this.setState({
	      		lists: lists,
	      		currentLists: Object.keys(lists)
	      	});
    	});

    	console.log(Object.keys(this.state.movies).length);
	}

	handleClickMovie = (currentMovie) =>{
		//hidescroll
		const $body = document.querySelector('body');
		$body.style.overflow = 'hidden';

		//get lists that movie doesnt belong to 
		let allListKeys = Object.keys(this.state.lists);
		let allListValues = Object.values(this.state.lists);
		let listsToAddTo = []
		console.log(currentMovie)

		allListKeys.map((list, i) => {
			console.log(this.state.lists[list][currentMovie])
			if((this.state.lists[list] === "empty") || (this.state.lists[list][currentMovie] === undefined)){
				listsToAddTo.push(list)
			}
		});
		console.log(listsToAddTo)
		this.setState({ //set current movie state
			currentMovie:  currentMovie,
			listsToAddTo: listsToAddTo
		});
	}

	revealScroll(){
		const $body = document.querySelector('body');
		$body.style.overflow = 'auto';
	}

	deleteMovie(){
		firebase.database().ref('movies').child(this.state.currentMovie).remove();
		const { [this.state.currentMovie]: _, ...newDisplay} = this.state.display;
		console.log(newDisplay);
		this.setState({
			display: newDisplay
		})
	}

	loadMore(){
		console.log("loadMore");
		const moviesLength = Object.keys(this.state.display).length;
		let newView = this.state.view + 8;

		if(newView >= moviesLength){
			this.setState({
				loadMore: false
			});
		}
		this.setState({
			view: newView
		});
	}

	handleChange(e) {
		let currentList = [];
		let newList = [];
		console.log("handlechange",e.target.value)
		if (e.target.value !=="") {
			console.log("if")
			currentList = Object.values(this.state.movies);

			newList = currentList.filter(movie => {
				const lc = movie.Title.toLowerCase();
				const filter = e.target.value.toLowerCase();
				return lc.includes(filter);
			});
		} 
		this.setState({
			filtered: newList
		});
	}

	goToList = (item) => {
		console.log(item);
		//update displaying movies

		let currentLists = Object.keys(this.state.lists).filter(list => {
			return list !== item;
		});
		console.log(currentLists);
		if((item !== "All")){
			if(!currentLists.includes("All")){
				currentLists.push("All");
			}
			this.setState({
				currentLists: currentLists,
				currentListName: item,
				display: this.state.lists[item]
			});	
		}
		else {
			this.setState({
				currentLists: currentLists,
				currentListName: item,
				display: this.state.movies
			})
		}
	}

	addToList = (item) => {
		const currentMovie = this.state.currentMovie;
		const currentMovieObject = this.state.movies[currentMovie];

		const listsRef = firebase.database().ref('lists').child(item);
		listsRef.child(currentMovie).set(currentMovieObject);
	}

	render() {
		let movies = Object.values(this.state.display);
		let filtered = Object.values(this.state.filtered);
		if(filtered.length > 0){
			movies = filtered;
		}
		let items = Object.keys(this.state.lists);
		// if(this.state.currentListName !== "All"){
		// 	items.push("All")
		// }
		let listsToAddTo = Object.values(this.state.listsToAddTo);
		return (
			<div>
				<div class="header">
					<div class="inline">
						<h1>Movies</h1>
						<Dropdown name={this.state.currentListName} items={this.state.currentLists} handleClick={this.goToList}/>
						<input type="text" name="search" placeholder="Search..." onChange={this.handleChange}/>
					</div>
				</div>
				<div>
					<section class="movies">
						{movies.slice(0,this.state.view).map((movie) =>{
							let hrefID = '#' + movie.Title;
							return (<a href={hrefID}>
								<img src={movie.Poster} onClick={this.handleClickMovie.bind(this, movie.imdbID)} width="300" height="400" alt={movie.Title}/>
							</a>)
						})}
					</section>
					{movies.map((movie) => (
						<a href="#" class="lightbox" onClick={this.revealScroll.bind(this)} id={movie.Title} >
						  	<img src={movie.Poster} alt={movie.Title}/>
						  	<p> Title: {movie.Title}</p>
						 	<p> Director: {movie.Director}</p>
							<p>IMDB Rating: {movie.imdbRating}</p>
							<button onClick={this.deleteMovie.bind(this)}> Delete Movie </button>
							<Dropdown name="Add to list" items={listsToAddTo} handleClick={this.addToList}/>
						</a>
					))}
					{this.state.loadMore &&
						<div className="center">
							<button onClick={this.loadMore.bind(this)}>Load More</button>
						</div>
					}
				</div>	
			</div>
		);
	}
}
export default Movies