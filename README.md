# ReduxCart
A simplistic ecommerce store mockup site built to utilize a fullstack toolkit. Users can create Book items a have those items added to the database. The Cart is persisted by express-sessions and is stored then later retrieved by api requests. ReduxCart is a web app built using the NERD stack. It is server-side rendered and is scalable to fit any device.
## Table of Contents
- [Demo](#demo)
- [Implementation](#implementation)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [License](#license)
## Demo
![redux cart](https://lh3.googleusercontent.com/jz0LohjVdSGgSGvwUgU5b6gfwrO_txwkq925_g_vuBZFawNTjBsLTNoV1ioGoLoKiaBt6CyaBIUUplhXh4LoWE93wujplGgZxoW5l033dK6JECXKDPEvt4ZY3_cBdZvnwDSOhCHw5Gu3e_OdoLFi5k0YRZOYF2pAm0XecXQPEfapHDQlKJ4EhkV5hXqIqgdTkh1xWU1AX0iN8TWfM9wZrgfHtfdLxjYVgejY0-jdDYqFDmX5oSQutZF5xD8av19QIt_m5_4nRSBBFjWN0EGEb7rSINkHmrRR8p75TU_HuTdd9XbGfYSWmqHoza2UuOqNH6UTAmr6kJwvJURK-qEZtjtWhn7tVUCwfP8RGUX0fiTRUMuwd77UWC2dIOmLog-zn6uvzOyKXFGurItaXsO7wRHfnhyx5_b8XSTzyfsCEcTV5olY8oRPBbqlTzuPN3kXHdd8Q4nMZ7PHYjaxkyKvMKrn0F8_JNsdOumc9r8_6GIAlgiScrh_YcX77fkCTEVRPeSAopGHHIk8o37wLuuWuVISQHXgjKMxRa_OGf_1Ie5v4nVNZHLZ1KjwLaBZVyqbe906HfI4GP71_UNFR0oEGVPmmmNhfcKbw6IsQIE=w1024-h900-no)
App is currently live: https://rc-zm.herokuapp.com/
## Implementation
To clone this repository you need [Git](https://git-scm.com/), [Node](https://nodejs.org/) and Node's package manager ([npm](https://www.npmjs.com/)) installed on your computer.
**-- OPTIONAL --**
[MongoDB](https://www.mongodb.com) (See installation for more details)
### Dependencies
```
"devDependencies": {
    "css-loader": "^0.28.11",
    "extract-loader": "^2.0.1",
    "file-loader": "^1.1.11",
    "node-sass": "^4.9.0",
    "nodemon": "^1.17.4",
    "npm-run-all": "^4.1.3",
    "object-assign": "^4.1.1",
    "redux-logger": "^3.0.6",
    "sass-loader": "^7.0.1",
    "url-loader": "^1.0.1",
    "webpack": "^2.2.1",
    "webpack-cli": "^2.1.3"
},
"dependencies": {
    "axios": "^0.18.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "connect-mongo": "^2.0.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "ejs": "^2.6.1",
    "express": "^4.16.3",
    "express-session": "^1.15.6",
    "http-errors": "~1.6.2",
    "http-proxy": "^1.17.0",
    "jade": "~1.11.0",
    "mongoose": "^5.0.17",
    "morgan": "^1.9.0",
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-redux": "^5.0.7",
    "react-router": "^3.2.0",
    "redux": "^4.0.0",
    "redux-thunk": "^2.2.0"
}
```
### Installation
```bash
# clone the repo
$ git clone https://github.com/Ziwam/ReduxCart.git

# go into the repo
$ cd reduxcart

# install the dependencies
$ npm install

# start the app
$ npm run start
```
**-- MongoDB --**
If you have a local mongodb database you would like to use, then modify the **apiServer.js** file to point to the url your database is hosted at.
## Deployment
Create a development ready build be running.
```bash
$ npm run build
```
## Technologies
This project includes:
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sass](https://sass-lang.com/)
- [Webpack](https://webpack.js.org/)
- [MongoDB](https://www.mongodb.com)
## License
(MIT License)
The MIT License (MIT) Copyright (c) 2018 Ziwa Mukungu zmukungu@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.