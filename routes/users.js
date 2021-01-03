/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const generateAccessTokens = (userId) => {
	const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '15m',
	});
	const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '14d',
	});

	return { refreshToken, accessToken };
};

router.post('/signup', async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const hash = bcrypt.hashSync(password, 10);
		const newUser = new UserModel({
			username,
			email,
			hash,
		});

		const createdUser = await newUser.save();
		const { refreshToken, accessToken } = generateAccessTokens(createdUser._id);

		res.cookie('refreshToken', refreshToken, {
			expires: new Date(Date.now() + 1000 * 60 * 60), // expires in 1 hour
			httpOnly: true,
			secure: true,
			sameSite: 'None',
		});

		res.setHeader('x-access-token', `Bearer ${accessToken}`);

		res.json(createdUser);
	} catch (error) {
		next(error);
	}
});

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const user = await UserModel.findOne({
			$or: [{ username }, { email: username }],
		});

		if (!user) {
			return res.status(400).json('user does not exist');
		}

		const match = bcrypt.compareSync(password, user.hash);

		if (match) {
			const { refreshToken, accessToken } = generateAccessTokens(user._id);

			res.cookie('refreshToken', refreshToken, {
				expires: new Date(Date.now() + 1000 * 60 * 60), // expires in 1 hour
				httpOnly: true,
				secure: true,
				sameSite: 'None',
			});

			res.setHeader('x-access-token', `Bearer ${accessToken}`);

			return res.json(user);
		}

		return res.status(400).json('username and password mismatch');
	} catch (error) {
		return next(error);
	}
});

router.post('/tokens', async (req, res, next) => {
	const { refreshToken: oldRefreshToken } = req.cookies;

	try {
		const { id: userId } = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);

		const { refreshToken, accessToken } = generateAccessTokens(userId);

		res.cookie('refreshToken', refreshToken, {
			expires: new Date(Date.now() + 1000 * 60 * 60), // expires in 1 hour
			httpOnly: true,
			secure: true,
			sameSite: 'None',
		});

		res.setHeader('x-access-token', `Bearer ${accessToken}`);
		res.json();
	} catch (error) {
		next(error);
	}
});

module.exports = router;
