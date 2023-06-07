const verifySignUpController = require("../api").verifySignUp;
const verifySignController = require("../api").verifySign;
const verifyJwtTokenController = require("../api").verifyJwtToken;
const destinationsController = require("../api").destinationsController;

module.exports = function (app) {
  //User Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUpController.checkDuplicateUserNameOrEmail,
      verifySignUpController.checkRolesExisted,
    ],
    verifySignController.signup
  );

  app.post("/api/auth/signin", verifySignController.signin);

  //destination
  app.get("/api/destinations", destinationsController.getDestinations);
  app.get(
    "/api/destinations/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    destinationsController.getDestinationsById
  );

  app.post(
    "/api/destinations/create",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    destinationsController.addDestinations
  );

  app.put(
    "/api/destinations/update/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    destinationsController.updateDestinations
  );

  app.delete(
    "/api/destinations/delete/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    destinationsController.deleteDestination
  );
};
