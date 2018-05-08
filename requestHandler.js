"use strict"
import axios from 'axios';

function handleRender(req,res){
	axios.get('http://localhost:3001/books')
	.then(function(reesponse){
		var myHtml = JSON.stringify(reesponse.data);
		res.render('index',{myHtml});
	})
	.catch(function(err){
		console.log('#Initial Server-side rendering error', err);
	})
}

module.exports = handleRender;