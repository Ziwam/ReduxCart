import React, {Component} from 'react';
import {MenuItem,InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
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

	handleSelect(img){
		this.setState({
			img: '/images/'+img
		})
	}

	resetForm(){
		this.props.resetButton();
		findDOMNode(this.refs.title).value = '';
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
				<MenuItem key={i} eventKey={imgArr.name}
				onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
			)
		},this)		

		return (
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
						      <FormControl type="text" ref="images" value={this.state.img}/>
						      <DropdownButton
						        componentClass={InputGroup.Button}
						        id="input-dropdown-addon"
						        title="Select Image"
						        bsStyle="primary"
						      >
						        {imgList}
						      </DropdownButton>
						    </InputGroup>
						    <Image src={this.state.img} responsive/>
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup controlId="title">
								<ControlLabel>Title</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Title"
									ref="title"/>
							</FormGroup>
							<FormGroup controlId="description">
								<ControlLabel>Description</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Description"
									ref="description"/>
							</FormGroup>
							<FormGroup controlId="Price">
								<ControlLabel>Price</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Price"
									ref="price"/>
							</FormGroup>
							<Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
								bsStyle={(!this.props.style)?("primary"):(this.props.style)}
							>
								{(!this.props.msg)?("Save book"):(this.props.msg)}
							</Button>
						</Panel>
						<Panel style={{marginTop:'25px'}}>
							<FormGroup controlId="formControlsSelect">
						      <ControlLabel>Select a book id</ControlLabel>
						      <FormControl ref="delete" componentClass="select" placeholder="select">
						        <option value="select">select</option>
						       	{bookList}
						      </FormControl>
						   </FormGroup>
						   <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
						</Panel>
					</Col>
				</Row>
			</Well>
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