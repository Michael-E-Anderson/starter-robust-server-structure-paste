const users = require("../data/users-data")

function list(req, res) {
    res.json({ data: users })
}

function userExists(req, res, next) {
    const userId = Number(req.params.userId)
    const foundUser = users.find(user => user.id === userId)
    if (foundUser) {
        res.locals.user = foundUser;
        return next()
    }
    next({
        status: 404,
        message: `User id not found: ${userId}`
    })
}

function read(req, res, next) {
    res.json({ data: res.locals.user })
}

module.exports = {
    list,
    read: [userExists, read],
    userExists,
}