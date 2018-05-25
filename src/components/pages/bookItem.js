import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions';

class BookItem extends Component {
	constructor(props){
		super(props);
		this.state ={
			isClicked: false
		}
	}

	handleCart(){
		const book = [...this.props.cart, {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			images: this.props.images,
			price: this.props.price,
			quantity: 1
		}]

		if(this.props.cart.length > 0 ) {
			let _id = this.props._id;

			let cartIndex = this.props.cart.findIndex(function(cart){
				return cart._id === _id
			})

			if(cartIndex === -1){
				this.props.addToCart(book);
			} else {
				this.props.updateCart(_id, 1, this.props.cart);
			}	
		} else {
			this.props.addToCart(book);
		}
	}

	toggleReadMore(){
		this.setState({isClicked: !this.state.isClicked})
	}

	render() {
		return (
			<div className="book">
						<img src={this.props.images} alt=""/>
						<div className="info">
							<div className="top">
								<p className="title">{(this.props.title.length > 13 && this.state.isClicked === false)
								?(this.props.title.substring(0,16)+"...")
								:(this.props.title)}</p>
								<p className="author">{this.props.author}</p>
							</div>
							<p className="description">{(this.props.description.length > 120 && this.state.isClicked === false)
								?(this.props.description.substring(0,120))
								:(this.props.description)}
								<button className='more' onClick={this.toggleReadMore.bind(this)}>
									{(this.state.isClicked === false && this.props.description !== null &&
									this.props.description.length > 50)?('...read more'):('...show less')}
								</button>
							</p>
							<div className="bottom">
								<p className="price">$ {this.props.price}</p>
								<button onClick={this.handleCart.bind(this)}>Add to Cart</button>
							</div>
						</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return{
		cart: state.cart.cart
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addToCart: addToCart,
		updateCart: updateCart
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem);