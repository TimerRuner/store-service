const accountModel = require("../models/account")
const nodemailer = require("nodemailer")
const handlebars = require('handlebars');
const fs = require('fs');
const uuid = require("uuid")
const path = require("path")

const emailTemplate = fs.readFileSync(path.join(__dirname, "..", "templates", "welcome.hbs"), 'utf8');
const compiledTemplate = handlebars.compile(emailTemplate);
class AccountService {
    async create(dto) {
        try {
            return await accountModel.create(dto)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async generateActivationLink(userId, email) {
        const activationLink = `${process.env.API_URL}/api/account/activate/${uuid.v4()}`
        const account = await this.create({userId, activationLink})
        await this.sendActivationLink(email, activationLink)
        return account
    }

    async activate(activationLink) {
        try {
            return await accountModel.findOneAndUpdate({ activationLink: { $regex: activationLink } }, { isActivated: true }, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAccountStatusByUserId(userId) {
       const account = await accountModel.findOne({userId})
       return account.isActivated
    }

    async sendActivationLink(email, link){
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            })
            await transporter.sendMail({
                to: email,
                subject: `Activation account ${process.env.API_URL}`,
                html: compiledTemplate({ link, email })
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = new AccountService()