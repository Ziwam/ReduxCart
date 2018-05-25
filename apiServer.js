var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://ziwam:bone99@ds141406.mlab.com:41406/bookshop');
//LOCAL
// mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//---->>> SET UP SESSIONS
app.use(session({
	secret:'secureString',
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
	store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))
//---->>> SAVE CART SESSION API
app.post('/cart', function(req,res){
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err){
		if(err){
			throw err;
		}
		res.json(req.session.cart);
	})
})
//---->>> GET CART SESSION API
app.get('/cart', function(req,res){
	if(typeof req.session.cart !== 'undefined'){
		res.json(req.session.cart);
	}
})
//---->>> END SET UP




var Books = require('./models/books.js');

//---->>> POST BOOKS
app.post('/books',function(req, res){
	var book = req.body;

	Books.create(book, function(err, books){
		if(err){
			throw err;
		}
		res.json(books);		
	});
});
//---->>> GET BOOKS
app.get('/books', function(req, res){
	Books.find(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
})
//---->>> DELETE BOOKS
app.delete('/books/:_id',function(req,res){
	var query = {_id: req.params._id};

	Books.remove(query, function(err,books){
		if(err){
			console.log("API DELETE BOOKS: ",err)
		}
		res.json(books);
	})
})
//---->>> UPDATE BOOKS
app.put('/books/:_id', function(req,res){
	var book = req.body;
	var query = req.params._id;

	var update = {
		'$set':{
			title: book.title,
			author: book.author,
			description: book.description,
			image: book.image,
			price: book.price
		}
	};

	var options = {new:true};

	Books.findOneAndUpdate(query, update, options, function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
})
//---->>> GET BOOK IMAGES API
app.get('/images', function(req,res){
	const imgFolder = __dirname + '/public/images/';

	const fs = require('fs');
	fs.readdir(imgFolder, function(err, files){
		if(err){
			return console.log(err)
		}
		
		const filesArr = [];
		files.forEach(function(file){
			filesArr.push({name:file});
		})
		res.json(filesArr);
	})
})
//END APIs

app.listen(3001, function(err){
	if(err){
		return console.log(err);
	}
	console.log('API server is listening on port 3001');
})