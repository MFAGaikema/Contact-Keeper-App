const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route POST api/users
//@desc Register a user
//@access Public

router.post(
	'/',
	check('name').isLength({ min: 3 }).withMessage('Please enter at least 3 chars'),
	check('email').isEmail().withMessage('Please enter a valid e-mail address'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Please enter at least 6 chars')
		.matches(/\d/)
		.withMessage('Password must contain a number'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ msg: 'User already exists' });
			}

			user = new User({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('server error');
		}
	}
);

module.exports = router;
