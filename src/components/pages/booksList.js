"use strict"
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';

class BookList extends Component {
	componentDidMount() {
		this.props.getBooks();
	}

	render() {
		const bookList = this.props.books.map(function(booksArr){
			return(
				<div className="book_wrapper" key={booksArr._id}>
					<BookItem
						_id={booksArr._id}
						title={booksArr.title}
						author={booksArr.author}
						description={booksArr.description}
						images={booksArr.images}
						price={booksArr.price}/>
				</div>
			)
		})
		return (
			<div className="main_wrapper">
				<Cart/>
				<div className="book_list">
					{bookList}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getBooks:getBooks},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList);