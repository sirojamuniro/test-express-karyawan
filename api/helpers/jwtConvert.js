require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
	sign(user) {
    	return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '5d' })
  	},

	verify(stringtoken){
		if(stringtoken){
			return jwt.verify(stringtoken, process.env.JWT_SECRET)
		}
  	}
}
