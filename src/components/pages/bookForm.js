import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BookForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			images:[{}],
			img:''
		}
	}

	componentDidMount(){
		this.props.getBooks();

		axios.get('/api/images')
		.then(function(response){
			this.setState({images: response.data})
		}.bind(this))
		.catch(function(err){
			this.setState({images:'error loading images from server', img: ''})
		})
	}

	handleSubmit(){
		const book = [{
			title: findDOMNode(this.refs.title).value,
			author: findDOMNode(this.refs.author).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.images).value,
			price: findDOMNode(this.refs.price).value,
		}]
		this.props.postBooks(book);
	}

	onDelete() {
		let bookId = findDOMNode(this.refs.delete).value;

		this.props.deleteBooks(bookId)
	}

	handleSelect(evn){
		this.setState({
			img: `/images/${evn.target.value}`
		})
	}

	resetForm(){
		this.props.resetButton();
		findDOMNode(this.refs.title).value = '';
		findDOMNode(this.refs.author).value = '';
		findDOMNode(this.refs.description).value = '';
		findDOMNode(this.refs.price).value = '';
		this.setState({img: ''});
	}

	render() {

		const bookList = this.props.books.map(function(bookArr){
			return (
				<option key={bookArr._id}>{bookArr._id}</option>
			)
		})


		const imgList = this.state.images.map(function(imgArr, i){
			return(
				<option key={i}
				value={imgArr.name}>{imgArr.name}</option>
			)
		},this)		

		return (
			<div className="form_wrapper">
				<div className="form">
					<div className="image_input">
						<div className="top">
							<input type="text" ref="images" value={this.state.img}/>
							<select
								className="dropdown"
								value="select"
								onChange={(evn)=>this.handleSelect(evn)}
							>
								<option value="select">select</option>
							{imgList}
							</select>
						</div>
					    <img src={this.state.img} alt=""/>
					</div>
					<div className="info_input">
							<h5>Title</h5>
							<input
								type="text"
								placeholder="Enter Title"
								ref="title"/>
							<h5>Author</h5>
							<input
								type="text"
								placeholder="Enter Author"
								ref="author"/>
							<h5>Description</h5>
							<textarea
								type="text"
								placeholder="Enter Description"
								ref="description"
							>
							</textarea>
							<h5>Price</h5>
							<input
								type="text"
								placeholder="Enter Price"
								ref="price"/>
						<button className="save_btn" onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}>
							{(!this.props.msg)?("save book"):(this.props.msg)}
						</button>
					      <h5>Select a book id</h5>
					      <select ref="delete" placeholder="select">
					        <option value="select">select</option>
					       	{bookList}
					      </select>
					   <button className="delete_btn" onClick={this.onDelete.bind(this)}>delete book</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		books: state.books.books,
		msg: state.books.msg,
		style: state.books.style
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({postBooks, deleteBooks, getBooks, resetButton},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookForm);