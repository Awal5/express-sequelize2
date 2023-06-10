const verifySignUpController = require("../api").verifySignUp;
const verifySignController = require("../api").verifySign;
const verifyJwtTokenController = require("../api").verifyJwtToken;
const destinationsController = require("../api").destinationsController;
const vehiclesController = require("../api").vehicles;
const orderController = require("../api").order;

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

  //vehicles
  app.get("/api/vehicles", vehiclesController.getVehicle);

  app.get(
    "/api/vehicles/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    vehiclesController.getVehicleById
  );

  app.post(
    "/api/vehicles/create",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    vehiclesController.createVehicle
  );

  app.put(
    "/api/vehicles/update/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    vehiclesController.updateVehicle
  );

  app.delete(
    "/api/vehicles/delete/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    vehiclesController.deleteVehicle
  );

  //order
  app.get(
    "/order",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isUser],
    orderController.findMyOrder
  );

  app.get(
    "/orders/admin",
    verifyJwtTokenController.verifyToken,
    orderController.findAll
  );

  app.get(
    "/order/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    orderController.findOne
  );

  app.post(
    "/order/create",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isUser],
    (req, res) => {
      orderController.createOrder(req, res);
    }
  );
};
