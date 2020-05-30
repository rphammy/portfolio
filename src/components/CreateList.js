import React, { Component } from 'react';
import config from '../firebase.js'

const firebase = require('firebase');

const API_KEY_OLD = '1955a28a'
const API_KEY = '2f234db7'
 

export class CreateList extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	    	list: '',
	    	error: '',
	    	formStatus: ''
	    }
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);
  	}

	handleChange(e) {
		e.preventDefault();
		const {name, value} = e.target;
		let error = this.state.error;

		this.setState({ error, [name]: value })
	}
	handleSubmit(e){
	  	e.preventDefault(); //dont cause page to refresh on submit
	  	let list = e.target.elements.list.value
		let formStatus = "Your list was added :)";


		const listRef = firebase.database().ref('lists');
		listRef.child(list).once("value", snapshot => {
			if(snapshot.exists()){
				formStatus = "ListName already exists!";
			}
			else{
				listRef.child(list).set("empty");
			}
		});




	  	this.setState({
	  		list: '',
	  		error: '',
	  		formStatus: formStatus
	  	});

	}
	render() {
		const { formStatus} = this.state;
		return (
			<div>
				<div className="header">
					<h1>Add a new list</h1>
				</div>
				<div className="container">
		    		<section className='add-item'>
						<form onSubmit={this.handleSubmit}>
							<p> Message </p>
							<textarea type='text' cols="100" rows="3" name="list" placeholder="List Name"  />
							{ formStatus.length > 0 && 
		    					<p> {formStatus} </p> }
							<button>Submit</button>
						</form>
					</section>
				</div>
			</div>
		);
	}
}
export default CreateList;
