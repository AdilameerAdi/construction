const express = require("express");
const router = express.Router();
const customerController = require("../Controllers/CustomerController.js");

// CRUD routes
router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
