const express = require("express")
const Role = require("../controller/role.controller")

const router = new express.Router()

router.post("/create", Role.create)
router.get("/getAll", Role.getAll)
router.get("/get/:value", Role.getRole)
router.patch("/update/:value", Role.updateRole)
router.delete("/delete/:value", Role.deleteRole)

module.exports = router