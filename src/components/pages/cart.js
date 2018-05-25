"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state= {
			showModal: false
		}
	}

	componentDidMount(){
		this.props.getCart();
	}

	open(){
		this.setState({showModal:true})
	}

	close(){
		this.setState({showModal:false})
	}

	onDelete(_id){
		const itemtoDelete = this.props.cart;

		const indexToDelete = itemtoDelete.findIndex(
			function(cart) {
				return cart._id === _id;
			}
		)

		const cartArr = [...itemtoDelete.slice(0, indexToDelete), ...itemtoDelete.slice(indexToDelete + 1)]
		this.props.deleteCartItem(cartArr)
	}

	onIncrement(_id) {
		this.props.updateCart(_id,1, this.props.cart);
	}

	onDecrement(_id, qtn) {
		if(qtn>1)
		this.props.updateCart(_id,-1, this.props.cart);
	}

	createCartItems = () => {
		return this.props.cart.map((cartArr) => {
			return (
				<div className="cart_item" key={cartArr._id}>
					<div className="item">
						<button className="delete_btn" onClick={this.onDelete.bind(this,cartArr._id)}>X</button>
						<img src={cartArr.images} alt=""/>
						<div className="text">
							<span className="title">{cartArr.title}</span>
							<span className="id">{cartArr._id}</span>
						</div>
					</div>
					<div className="quantity">
						<button onClick={this.onIncrement.bind(this,cartArr._id)}>+</button>
						<span>{cartArr.quantity}</span>
						<button onClick={this.onDecrement.bind(this,cartArr._id, cartArr.quantity)} >-</button>
					</div>
					<span className="price">${cartArr.price}</span>
					<span className="total">${cartArr.price * cartArr.quantity}</span>
				</div>
			)
		})
	}

	render() {
		return this.props.cart[0]
		? this.renderCart()
		: this.renderEmpty()
	}

	renderEmpty(){
		return (<div></div>)
	}

	renderCart(){
		const cartItemsList = this.createCartItems();

		return(
			<div className="cart">
				<h3>Shopping Cart</h3>
				<div className="categories">
					<span className="large">item</span>
					<span>quantity</span>
					<span>price</span>
					<span>total</span>
				</div>
				<div className="wrapper">
					{cartItemsList}
					<div className="checkout">
						<p>${this.props.totalAmount}</p>
						<button onClick={this.open.bind(this)}>
							checkout
						</button>
					</div>
				</div>
				<div className={`modal${this.state.showModal? "":" hidden"}`}>
					<div className="backdrop"></div>
					<div className="wrapper">
						<div className="content">
				            <h4>Thank You</h4>
				            <div className="mid">
					          	<p>Your order is saved</p>
					          	<p>Shipment confirmed</p>
				            </div>
				          	<div className="bottom">
								<h5>total $:{this.props.totalAmount}</h5>
					            <button onClick={this.close.bind(this)}>Close</button>
				          	</div>
						</div>
					</div>
		        </div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		cart:state.cart.cart,
		totalAmount: state.cart.totalAmount
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		deleteCartItem: deleteCartItem,
		updateCart: updateCart,
		getCart: getCart
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);