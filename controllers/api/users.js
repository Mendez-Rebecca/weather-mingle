const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    create,
    checkToken
};

async function create(req, res) {
    try {
        // Add the user to the db
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

/*--- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}
