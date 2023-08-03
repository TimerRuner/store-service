const authService = require("../services/auth.service")
const ApiError = require("../error/ApiError");
class AuthController {
    async login(req, res, next) {
        try {
            const dto = req.body
            const loginData = await authService.login(dto)
            res.cookie("refreshToken", loginData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            res.json(loginData)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async registration(req, res, next) {
        try {
            const dto = req.body
            const registrationData = await authService.registration(dto)
            res.cookie("refreshToken", registrationData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            res.json(registrationData)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies["refreshToken"]
            await authService.logout(refreshToken)
            res.clearCookie("refreshToken", {httpOnly: true})
            res.clearCookie("user", {httpOnly: true})
            res.json({})
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies["refreshToken"]
            const refreshedData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", refreshedData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            res.json(refreshedData)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new AuthController()