"use strict"
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import {addToCart} from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks} from './actions/booksActions';
import logger from 'redux-logger';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import "./styles/index.scss";
import BookList from './components/pages/booksList';
import Menu from './components/menu';
import BooksForm from './components/pages/bookForm';
import Main from './main';
import Cart from './components/pages/cart';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

// store.subscribe( function(){
// 	console.log('the current props is:', store.getState());
// })

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BookList}/>
				<Route path="/admin" component={BooksForm}/>
				<Route path="/cart" component={Cart}/>
			</Route>
		</Router>
	</Provider>
)

render(
	Routes, document.getElementById('app')
)

// store.dispatch(postBooks(
// 	[{
// 		id: 1,
// 		title: 'green eggs',
// 		description: 'no sam'
// 	},
// 	{
// 		id: 2,
// 		title: 'blue eggs',
// 		description: 'no sam',
// 		price: 
// 	}]
// ))

// store.dispatch(deleteBooks(
// 	{
// 		id:2
// 	}
// ))

// store.dispatch(updateBooks(
// 	{
// 		id: 1,
// 		title: 'purple eggs'
// 	}
// ))

// store.dispatch(addToCart([{id:1}]));