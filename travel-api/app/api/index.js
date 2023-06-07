const verifySign = require("./auth/verifySign");
const verifySignUp = require("./auth/verifySignUp");
const verifyJwtToken = require("./auth/verifyJwtToken");
const destinationsController = require("./destinations/destinations");

module.exports = {
  verifySign,
  verifySignUp,
  verifyJwtToken,
  destinationsController,
};
