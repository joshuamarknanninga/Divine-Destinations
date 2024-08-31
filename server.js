const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Session configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use true if you're using HTTPS
}));

app.use(bodyParser.urlencoded({ extended: true }));

// Auth Middleware
function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Public route (accessible by anyone)
app.get('/', (req, res) => {
    res.render('pages/homepage', { title: 'Home' });
});

// Login route (public)
app.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Login' });
});

// Protected route (requires authentication)
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('pages/dashboard', { title: 'Dashboard' });
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

