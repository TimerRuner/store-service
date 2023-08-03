const {Router} = require("express")
const routeAccount = require("./account.route")
const routeAuth = require("./auth.route")
const routeBasket = require("./basket.route")
const routeBasketDevice = require("./basket_device.route")
const routeBrand = require("./brand.route")
const routeDevice = require("./device.route")
const routeDeviceCharacteristic = require("./device_characteristic.route")
const routeRating = require("./rating.route.js")
const routeRole = require("./role.js")
const typeRole = require("./type.route.js")
const userRole = require("./user.route.js")

const router = new Router()

router.use('/account', routeAccount)
router.use('/auth', routeAuth)
router.use('/basket', routeBasket)
router.use('/basketDevice', routeBasketDevice)
router.use('/brand', routeBrand)
router.use('/device', routeDevice)
router.use('/deviceCharacteristic', routeDeviceCharacteristic)
router.use('/rating', routeRating)
router.use('/role', routeRole)
router.use('/type', typeRole)
router.use('/user', userRole)


module.exports = router