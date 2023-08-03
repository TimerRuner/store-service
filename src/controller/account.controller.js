const ApiError = require("../error/ApiError")
const accountService = require("../services/account.service")

class AccountController {
    async activate(req, res, next) {
        try {
            const {link} = req.params
            const account = await accountService.activate(link)
            res.redirect(process.env.UI_ORIGIN)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new AccountController()