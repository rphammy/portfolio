import React, { Component } from 'react';
import config from '../firebase.js'
import { motion } from "framer-motion"
const firebase = require('firebase')

const validateForm = (errors, name, message) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);

	if(name.length === 0) {
		valid = false;
		errors.name = "This field is required";
	}
	if(message.length === 0){
		valid = false;
		errors.message = "This field is required";
	}
	return valid;
}

export class GuestBook extends Component {

  constructor(props) {
    super(props);
    this.state = { 
    	name: '',
    	description: '',
    	message: '',
    	public: false,
    	email: '',
    	guests: [],
    	errors: {
    		name: '',
    		description: '',
    		message: '',
    		public: ''
    	},
    	formStatus: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    /* Create reference to messages in Firebase Database */
    if(!firebase.apps.length) {
    	firebase.initializeApp(config);
	}

    const guestsRef = firebase.database().ref('guests');
    guestsRef.on('value', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let guests = snapshot.val();
      let newState = [];
      for(let guest in guests) {
      	newState.push({
      		id: guest,
      		name: guests[guest].name,
      		description: guests[guest].description,
      		message: guests[guest].message,
      		public: guests[guest].public,
      		date: guests[guest].date,
      		email: guests[guest].email
      	});
      }
      this.setState({
      	guests: newState
      });
    });
  }

  handleChange(e){
  	e.preventDefault();
  	const {name, value } = e.target;
  	let errors = this.state.errors;

  	switch(name) {
  		case 'name':
	  		if(value.length <= 5)
	  			errors.name = 'Name must be longer than 5 characters!';
	  		else if (value.length >=20)
	  			errors.name = 'Name must be less than 20 characters!';
	  		else
	  			errors.name = '';
	  		break;
	  	case 'description':
	  		errors.description = 
	  			value.length >= 100 
	  			? 'Description must be less than 100 characters!'
	  			: '';
	  		break;
	  	case 'message':
	  		if(value.length <= 15)
	  			errors.message = 'Message must be longer than 15 characters!';
	  		else if (value.length >=500)
	  			errors.message = 'Message must be less than 500 characters!';
	  		else
	  			errors.message = '';
	  		break;
	  	default:
	  		break;
  	}

  	this.setState({ errors, [name]: value}, 
  		() => {
  		console.log(errors)
  		})
  }
  onChangePublic = () => {
  	this.setState(initialState => ({
  		public: !initialState.public
  	}));
  }

  handleSubmit(e){
  	e.preventDefault(); //dont cause page to refresh on submit

	const timestamp = Date.now(); // This would be the timestamp you want to format
	const date = new Intl.DateTimeFormat(
		'en-US', 
		{
			year: 'numeric', 
			month: '2-digit',
			day: '2-digit', 
			hour: '2-digit', 
			minute: '2-digit', 
			second: '2-digit'
		}).format(timestamp);

  	let formStatus = '';
  	const guestsRef = firebase.database().ref('guests');
  	const guest = {
  		name: this.state.name,
  		description: this.state.description,
  		message: this.state.message,
  		public: this.state.public,
  		email: this.state.email,
  		date: date
  	}

  	if(validateForm(this.state.errors, this.state.name, this.state.message)) { //valid form
  		guestsRef.push(guest);  
  		formStatus = "Your message was successfully recieved! Thanks for stopping by :)"
  	}
  	else { //invalid form 
  		formStatus = "Your submission is invalid, please correct your input"
  	}

  	this.setState({
  		name: '',
    	description: '',
    	message: '',
    	public: false,
    	email: '',
    	formStatus: formStatus
  	}, () => {
  		console.log(this.state.formStatus)
  	});

  }
  render() {
  	const {errors} = this.state;
  	const {formStatus} = this.state;
	const variants = {
	  visible: { opacity: 1 },
	  hidden: { opacity: 0 },
	}
    return (
    	<div>
	    	<div class="header">
				<h1>Guest Book</h1>
			</div>	
	    	<div className="container">
		    	<motion.div initial={{y: -30}}animate={{y: 0}} transition={{ delay: .1}} >
		    		<section className='add-item'>
						<form onSubmit={this.handleSubmit}>
							{ formStatus.length > 0 && 
		    					<span className='formStatus'> {formStatus}</span> }
							<p> Name </p>
							<input type="text" name="name" placeholder="John Smith" onChange={this.handleChange} value={this.state.name}/>
							{ errors.name.length >0 &&
								<span className='error'> {errors.name}</span>}
							
							<p> Description </p>
							<input type="text" name="description" placeholder="Just a dude" onChange={this.handleChange} value={this.state.description}/>
							{ errors.description.length >0 &&
								<span className='error'> {errors.description}</span>}
							
							<p> Message </p>
							<textarea type='text' cols="40" rows="3"name="message" placeholder="Cool site bro!" onChange={this.handleChange} value={this.state.message}/>
		 					{ errors.message.length >0 &&
								<span className='error'> {errors.message}</span>}
							
							<p> Email </p>
							<input type='text' name="email" placeholder="johnsmith@gmail.com" onChange={this.handleChange} value={this.state.email}/>

							<p> Would you like to make your message public? </p>
							<input type='checkbox' name="public" onChange={this.onChangePublic} checked={this.state.public} />

							<button>Submit</button>
						</form>
					</section>
				</motion.div>
			 	<motion.div initial={{y: 100}}animate={{y: 0}}>
					<section className='add-item'>
			            <div className='wrapper'>
			            	<p> Responses </p>
			             	<motion.ul>
			             		{this.state.guests.map((guest, i) => {
			             			if(guest.public && (!(this.state.guests.length === i +1))){
				             			return (
				             				<li className="guestbook_li" key={guest.id}>
				             					<p className="date"> {guest.date} </p>
				             					<p className="name">{guest.name}</p>
				             					<p className="description">{guest.description}</p>
				             					<p className="message"> {guest.message} </p>
				             				</li>
				             			)
			             			}
			             			if(guest.public && (this.state.guests.length === i +1)){
				             			return (
				             				<motion.li className="guestbook_li" initial="hidden" animate="visible" variants={variants} key={guest.id}>
				             					<p className="date"> {guest.date} </p>
				             					<p className="name">{guest.name}</p>
				             					<p className="description">{guest.description}</p>
				             					<p className="message"> {guest.message} </p>
				             				</motion.li>
				             			)
			             			}
			             		})}
			            	</motion.ul>
			            </div>
		          	</section>
	          	</motion.div>
	      	</div>
      	</div>
    );
  }
}

export default GuestBook;