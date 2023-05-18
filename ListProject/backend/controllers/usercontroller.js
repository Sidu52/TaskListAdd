const user = require('../module/user');
const jwt = require('jsonwebtoken');
const authentication = require('../config/isAuthentication')

const create = async (req, res) => {
    const { email } = req.body;
    try {
        const User = await user.findOne({ email });
        if (!User) {
            user.create(req.body);
            return res.status(200).json({
                message: 'User created',
                data: user
            });
        }
        return res.status(200).json({
            message: 'User Already Created',
            data: User
        })

    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user with the provided Email or Password
        const User = await user.findOne({ email });
        if (User && User.password === password) {
            const token = jwt.sign({ email, password }, "Sidhu", { expiresIn: '1h' });
            // Set the JWT token as a cookie
            res.cookie('token', token, { httpOnly: true });

            return res.status(200).json({
                message: `Successfully logged in`,
                data: token
            });
        }

        return res.status(400).json({ error: `Invalid email or password` });
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
};

const loginPage = async (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ message: 'Acces Login page' });
    }
    jwt.verify(token, "Sidhu", (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        req.user = decoded.user;

        return res.status(200).json({ message: ' Home page', success: true });
    });
};

const Singout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.json({ success: true });
}


const home = (req, res) => {
    // res.send("Home hurray")
    res.json({ success: true, message: 'Welcome to the home page!' });

}

module.exports = { create, login, loginPage, home, Singout }

