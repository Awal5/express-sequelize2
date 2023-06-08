const db = require("../../models");
const Vehicle = db.Vehicle;
const User = db.User;
const Destination = db.Destinations;
const Order = db.Order;

module.exports = {
  async findAll(req, res) {
    try {
      const getOrders = await Order.findAll({
        include: ["users", "vehicles", "destinations"],
      });

      res.status(200).send({
        status_response: true,
        message: "Show Orders List",
        data: getOrders || "Order is Empty",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  async findOne(req, res) {
    try {
      const orderId = req.params.id;
      const getOrder = await Order.findOne({
        where: { id: orderId },
        include: ["users", "vehicles", "destinations"],
      });

      res.send({
        status_response: true,
        message: "Showing Order ",
        data: getOrder || "Order Not Found",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  async findMyOrder(req, res) {
    try {
      const userId = req.userId;

      const getMyOrder = await Order.findAll({
        where: { user_id: userId },
        include: ["users", "vehicles", "destinations"],
      });

      if (getMyOrder.length === 0) {
        res.statu(400).send({
          status_response: true,
          message: "You not Order",
        });
        return;
      }

      res.send({
        status_response: true,
        message: "Showing Order List",
        data: getMyOrder,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  async createOrder(req, res) {
    try {
      const userId = req.userId;

      const travel_date = req.body.travel_date;

      const destination = await Destination.findOne({
        where: { name: req.body.destination },
      });

      const fromPlace = await Destination.findOne({
        where: { from: req.body.from },
      });

      if (!destination || !fromPlace) {
        res.status(400).send({
          status_response: false,
          message: "Destination Not Found",
        });
        return;
      }

      const vehicle = await Vehicle.findOne({
        where: { id: req.body.vehicle },
      });

      if (!vehicle) {
        res.status(400).send({
          status_response: false,
          message: "Vehicle Not Found",
        });
        return;
      }

      const tax = 0.11;

      const addOrder = {
        order_date: new Date(),
        travel_date: travel_date,
        tax: tax,
        total_price: destination.price + tax,
        status: false,
        user_id: userId,
        vehicles_id: vehicle.id,
        destinations_id: destination.id,
      };

      await Order.create(addOrder);

      res.send({
        status_response: true,
        message:
          "Order Successfull, Please Complete the Payment Before Departure",
        data: {
          order_date: addOrder.order_date,
          travel_date: addOrder.travel_date,
          status: "Waiting for Pay",
          vehicles: `${vehicle.name},  ${vehicle.vehicle_type}`,
          destination: `${destination.name} - ${destination.from}`,
          total_price: addOrder.total_price,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
