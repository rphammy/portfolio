import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import config from '../firebase.js';

const firebase = require('firebase');
var d3 = require("d3");

const data = {
	nodes: [	
    	{
    		name: "Rachle",
    		group: 1
    	},
    	{
    		name: "hi",
    		group: "2"
    	}
    	],
	links: [
    	{
    		source: 1,
    		target: 0,
    		value: 1
    	}
	]
}

export class Graph extends Component {
	drag = (simulation) => {
		function dragStarted(d) {
			if(!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragEnded(d) {
			if(!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return d3.drag()
			.on("start", dragStarted)
			.on("drag", dragged)
			.on("end", dragEnded)
	}
	chart(nodes, links) {
		const width = 1920;
		const height = 1080;

		const obj_links = links.map(d => Object.create(d));
		const obj_nodes = nodes.map(d => Object.create(d));

		const svg = d3.create("svg")
			.attr("viewBox", [0, 0, width, height]);

		const link = svg.append("g")
			.attr("stroke", "#999")
			.attr("stroke-opacity", 0.6)
			.selectAll("line")
			.data(obj_links)
			.join("line")
			.attr("stroke-width", d => Math.sqrt(d.value));

		const color = (node) => {
			if (node.group ==1) //name
				return d3.color("blue");
			return d3.color("pink");
		}

		const radius = (node) => {
			if (node.group ==1)
				return 20;
			return 40;
		}

		const simulation = d3.forceSimulation(obj_nodes)
			.force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width/2, height/2));

		const node = svg.append("g")
			.attr("stroke", "#fff")
			.attr("stoke-width", 1.5)
			.selectAll("circle")
			.data(obj_nodes)
			.join("circle")
			.attr("r", 20)
			.attr("fill", color)
			// .call(this.drag(simulation));

		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			node
				.attr("cx", d => d.x)
				.attr("cy", d => d.y);
		});

		return svg.node();

	}

	constructor() {
		super();
		this.state = {
			movies: [],
			nodes: [],
			links: [],
		};
	}

	componentDidMount(){
	    /* Create reference to messages in Firebase Database */
	    if(!firebase.apps.length) {
	    	firebase.initializeApp(config);
		}

		let currentNodeID = -1;
		let nodes = [];
		let links = [];
		let currentLinkID = -1;

    	const moviesRef = firebase.database().ref('lists').child('Graph');
	    moviesRef.on('value', snapshot => {
	    	snapshot.forEach(movie => {
	    		let title = movie.val().Title;
	    		let actors = movie.val().Actors;
	    		let imdbID = movie.val().imdbID;
	    		currentNodeID++;
	    		let currentMovieID = currentNodeID;
	    		nodes.push({
					name: title,
					id: currentNodeID,
				});

	    		//filter through Actors
	    		let actorsSplit = actors.split(', ');
	    		actorsSplit.map((actor) => {
	    			if(!nodes.some(item => item.name === actor)){		    			
		    			currentNodeID++;
		    			currentLinkID++;

		    			nodes.push({
		    				name: actor,
		    				id: currentNodeID
		    			});
		    			links.push({
		    				target: currentNodeID,
		    				source: currentMovieID,
		    				id: 0
		    			})
	    			}
	    		});

	    		this.setState(prevState => ({
	      			movies: {
	      				...prevState.movies,
	      				[imdbID]: movie.val()
	      			}
	     		}));
	    	});
    	});
 
    	const elem = document.getElementById("mysvg");
    	elem.appendChild(this.chart(data.nodes, data.links));
	}
	render() {
		return <div id="mysvg">
		</div>

	}
}
export default Graph;


