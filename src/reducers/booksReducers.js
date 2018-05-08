"use strict"

let books = [];

export function booksReducers(state = {books},action){
	switch(action.type) {
		case 'GET_BOOK':
			return {...state, books:[...action.payload]}
			break;
		case 'POST_BOOK':
			// let books = state.books.concat(action.payload)
			// return {books};
			return {books: [...state.books, ...action.payload], msg:'Saved! Click to continue', style:'success'}
			break;
		case 'POST_BOOK_REJECTED':
			// let books = state.books.concat(action.payload)
			// return {books};
			return {...state, msg:'Please, try again', style:'danger'}
			break;
		case 'DELETE_BOOK':
			const currentBookstoDelete = [...state.books]

			const indexToDelete = currentBookstoDelete.findIndex(
				function(book) {
					return book._id.toString() === action.payload;
				}
			)

			return {books: [...currentBookstoDelete.slice(0, indexToDelete), ...currentBookstoDelete.slice(indexToDelete + 1)]}
			break;
		case 'UPDATE_BOOK':
			const currentBookstoUpdate = [...state.books]

			const indexToUpdate = currentBookstoUpdate.findIndex(
				function(book) {
					return book._id === action.payload._id;
				}
			)

			const newBookToUpdate = {
				...currentBookstoUpdate[indexToUpdate],
				title: action.payload.title
			}

			// console.log('updated title', newBookToUpdate)

			return {books: [...currentBookstoUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookstoUpdate.slice(indexToUpdate + 1)]}
			break;
		case 'RESET_BUTTON':
			return {...state, msg:null, style:'primary'}
	}
	return state;
}