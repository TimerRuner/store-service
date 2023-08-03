const brypt = require("bcryptjs")

const userService = require("../services/user.service")
const tokenService = require("../services/token.service")
const accountService = require("../services/account.service")

const filterObject = require("../utils/filterObject")

class AuthService {
    async login(dto) {
        const user = await userService.getUserByEmail(dto.email)
        if(!user) {
            throw new Error(`User ${dto.email} doesn't exist`)
        }
        const isCorrectPassword = await brypt.compare(dto.password, user.password)
        if(!isCorrectPassword){
            throw new Error("Password incorrect")
        }
        const accountStatus = await accountService.getAccountStatusByUserId(user.id)
        return this.generateToken(user, {isActivated: accountStatus})
    }

    async registration(dto) {
        const existingUser = await userService.getUserByEmail(dto.email)

        if(existingUser) {
            throw new Error(`User ${dto.email} already exist`)
        }
        const hashPassword = await brypt.hash(dto.password, 7)

        const user = await userService.create({...dto, password: hashPassword})
        const account = await accountService.generateActivationLink(user.id, dto.email)
        return this.generateToken(user, account)
    }

    async logout(refreshToken) {
        await tokenService.deleteToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw new Error("User is not authorized")
        }
        const isValidToken = await tokenService.validateToken(refreshToken)
        const tokenData = await tokenService.findToken(refreshToken)

        if(!isValidToken && !tokenData) {
            throw new Error("User is not authorized")
        }

        const user = await userService.getUserById(tokenData.userId)
        const accountStatus = await accountService.getAccountStatusByUserId(user.id)

        return this.generateToken(user, {isActivated: accountStatus})
    }

    async generateToken(user, account) {
        const filteredObject = filterObject({...user}, ["password", "roleId", "createdAt", "updatedAt"])
        const {accessToken, refreshToken} = await tokenService.generateTokens(filteredObject)

        await tokenService.saveToken(user.id, refreshToken)

        return {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                isActivated: account.isActivated,
                role: user.roleId.value
            },
            refreshToken,
            accessToken
        }
    }
}

module.exports = new AuthService()