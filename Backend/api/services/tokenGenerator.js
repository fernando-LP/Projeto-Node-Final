const jwt = require("jsonwebtoken")

const JWTSECRET = "ksksksksksks"

module.exports = (email) => {
    let token = jwt.sign({ email }, JWTSECRET, { expiresIn: '20h' })
    return token
}