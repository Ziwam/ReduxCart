"use strict"
import axios from 'axios';

export function getCart(){
	return function(dispatch){
		axios.get("/api/cart")
		.then(function(response){
			dispatch({type:"GET_CART", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"GET_CART_REJECTED", msg:err})
		})
	}

}

export function addToCart(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
		.then(function(response){
			dispatch({type:"ADD_TO_CART", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"ADD_TO_CART_REJECTED", msg:err})
		})
	}
}

export function updateCart(_id, unit, cart){
	const currentBookstoUpdate = [...cart]

	const indexToUpdate = currentBookstoUpdate.findIndex(
		function(book) {
			return book._id === _id;
		}
	)

	const newBookToUpdate = {
		...currentBookstoUpdate[indexToUpdate],
		quantity: currentBookstoUpdate[indexToUpdate].quantity + 
		unit
	}

	// console.log('updated title', newBookToUpdate)

	let cartUpdate = [...currentBookstoUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookstoUpdate.slice(indexToUpdate + 1)]
	

	return function(dispatch){
		axios.post("/api/cart", cartUpdate)
		.then(function(response){
			dispatch({type:"UPDATE_CART", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"UPDATE_CART_REJECTED", msg:err})
		})
	}
}

export function deleteCartItem(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
		.then(function(response){
			dispatch({type:"DELETE_CART_ITEM", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"DELETE_CART_ITEM_REJECTED", msg:err})
		})
	}
}