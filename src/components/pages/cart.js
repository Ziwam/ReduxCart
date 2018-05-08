"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/CartActions';

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

	render() {
		return this.props.cart[0]
		? this.renderCart()
		: this.renderEmpty()
	}

	renderEmpty(){
		return (<div></div>)
	}

	renderCart(){
		const cartItemsList = this.props.cart.map(function(cartArr){
			return (
				<Panel key={cartArr._id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cartArr.title}</h6><span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>$ {cartArr.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth: '300px'}}>
								<Button onClick={this.onDecrement.bind(this,cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
								<Button onClick={this.onIncrement.bind(this,cartArr._id)} bsStyle="default" bsSize="small">+</Button>
								<span>     </span>
								<Button onClick={this.onDelete.bind(this,cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			)
		}, this)
		return(
			<Panel bsStyle="primary">
				<Panel.Heading>Cart</Panel.Heading>
				<Panel.Body>
					{cartItemsList}
					<Row>
						<Col xs={12}>
							<h6>Total amount: {this.props.totalAmount}</h6>
							<Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
								Proceed To Checkout
							</Button>
						</Col>
					</Row>
					<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
		          <Modal.Header closeButton>
		            <Modal.Title>Thank You</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<h6>Your order is saved</h6>
		          		<p>Shipment confirmed</p>
		          </Modal.Body>
		          <Modal.Footer>
		          	<Col xs={6}>
							<h6>total $:{this.props.totalAmount}</h6>
		          	</Col>
		            <Button onClick={this.close.bind(this)}>Close</Button>
		          </Modal.Footer>
		        </Modal>
				</Panel.Body>
			</Panel>
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