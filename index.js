const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('dotenv').config({
	path: '.env',
});

const mongoose = require('mongoose');

const logger = require('./config/logger');
const middlewares = require('./middlewares');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const whitelist = [
	'http://localhost:3000',
	'https://nervous-colden-2c004b.netlify.app/',
];

const corsOptions = {
	origin: (origin, callback) => {
		logger.info(origin);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else if (process.env.NODE_ENV !== 'production') {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	exposedHeaders: ['x-access-token'],
	credentials: true,
};

app.use(morgan('common'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/users', require('./api/users/users.routes.js'));

app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	logger.info('Listening on port', port);
});
