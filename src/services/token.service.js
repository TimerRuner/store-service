const jwt = require("jsonwebtoken")
const tokenModel = require("../models/token")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "30m"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET)

    }

    async saveToken(userId, refreshToken) {
        const record = await tokenModel.findOneAndUpdate({ userId }, { refreshToken }, { upsert: true, new: true })
        if(!record) {
            return await tokenModel.create({userId, refreshToken})
        } else {
            return record
        }
    }

    async deleteToken(refreshToken) {
        return await tokenModel.findOneAndDelete({refreshToken})
    }

    async findToken(refreshToken) {
        return await tokenModel.findOne({refreshToken})
    }

}

module.exports = new TokenService()