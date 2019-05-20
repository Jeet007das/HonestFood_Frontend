const expressJwt = require('express-jwt');
const config = require('../../config.json')
const userService = require('../Users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/users/login',
            '/users/logout',
            '/users/register',
            '/books/_getBooksLists',
            '/books/_addNewBook',
            '/books/_getBookListsById',
            '/books/_updateBookDetails',
            '/books/_deleteBookDetails',
            '/purchase/_buyBook',
            '/purchase/_getPurchaseList',
            '/register/_registerStore'
        ]
    });

}


async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    if (!user) {
        return done(null, true);
    }

    done();
};