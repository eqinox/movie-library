const handlebars = require('../handlebars/index');
const auth = require('../auth/authentication');

module.exports = (app) => {
    // User routes
    app.post('/users/login', handlebars.user.login);
    app.post('/users/logout', handlebars.user.logout)
    app.post('/users/register', handlebars.user.register);
    app.get('/users/profile', auth.isAuthenticated, handlebars.user.profile)
}