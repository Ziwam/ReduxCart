"use strict"
import React, {Component} from 'react';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state= {
			showMenu: false
		}
	}

	toggleMenu = () => {
		this.setState({showMenu: !this.state.showMenu});
	}

	render() {
		return (
			<nav className="menu">
		      <h1>ReduxCart</h1>
		      <div className={`links${this.state.showMenu? "":" hidden"}`}>
			      <a href="/">Home</a>
			      <a href="/admin">Admin</a>
			      <a href="/cart">Cart
			       { (this.props.cartItems > 0 )
			       	?(<span className="badge">({this.props.cartItems})</span>)
			       	:('')
			       }
			      </a>
		      </div>
		      <div className="menu_btn" onClick={this.toggleMenu}>
				<div className="bar1"></div>
				<div className="bar2"></div>
				<div className="bar3"></div>
		      </div>
			</nav>
		);
	}
}

export default Menu;