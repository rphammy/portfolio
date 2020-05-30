import React, { Component } from 'react';

export class Dropdown extends Component {
	constructor(){
		super()
		this.state = {
			displayMenu: false,
		};
		this.showDropdownMenu = this.showDropdownMenu.bind(this);
		this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
	}

	showDropdownMenu(e){
		e.preventDefault();
		this.setState({ displayMenu: true }, () => {
			document.addEventListener('click', this.hideDropdownMenu);
		});
	}

	hideDropdownMenu(){
		this.setState({ displayMenu: false }, () => {
			document.removeEventListener('click', this.hideDropdownMenu);
		});
	}

	render() {

		let items = this.props.items;
		return (
			<div className="dropdown" style = {{width: "200px"}}>
				<div className="dropdown_button" onClick={this.showDropdownMenu}> {this.props.name} </div>
				{ this.state.displayMenu ? (
					<ul className="dropdown_ul">
						{ items.map((item) => (
							<li className="dropdown_li" onClick={this.props.handleClick.bind(this, item)}>{item}</li>
						))}
					</ul>
				): (null)
				}
			</div>
		);
	}
}

export default Dropdown;
