const Vehicle = require("../../models").Vehicle;

module.exports = {
  getVehicleById(req, res) {
    return Vehicle.findByPk(req.params.id, {
      include: [],
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: "Not Found",
            errors: "Vehicle Not Found",
          });
        }
        const vehicle = {
          status_response: "OK",
          vehicle: doc,
          errors: null,
        };
        return res.status(200).send(vehicle);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  getVehicle(req, res) {
    return Vehicle.findAll({
      include: [],
      order: [["name", "ASC"]],
    })
      .then((docs) => {
        const vehicles = {
          status_response: "OK",
          count: docs.length,
          vehicles: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(vehicles);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  createVehicle(req, res) {
    return Vehicle.create({
      no_seri: req.body.no_seri,
      name: req.body.name,
      vehicle_type: req.body.vehicle_type,
      brand: req.body.brand,
    })
      .then((doc) => {
        const vehicle = {
          status_response: "Created",
          vehicle: doc,
          errors: null,
        };
        return res.status(201).send(vehicle);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  updateVehicle(req, res) {
    return Vehicle.findByPk(req.params.id, {})
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Vehicle Not Found",
          });
        }

        return vehicle
          .update({
            name: req.body.name || vehicle.name,
            vehicle_type: req.body.vehicle_type || vehicle.vehicle_type,
            brand: req.body.brand || vehicle.brand,
          })
          .then((doc) => {
            const vehicle = {
              status_response: "OK",
              vehicle: doc,
              errors: null,
            };
            return res.status(200).send(vehicle);
          })
          .catch((err) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: err,
            });
          });
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  deleteVehicle(req, res) {
    return Vehicle.findByPk(req.params.id)
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(400).send({
            status_response: "Bad Request",
            errors: "Vehicle Not Found",
          });
        }

        return vehicle
          .destroy()
          .then(() =>
            res.status(204).send({
              status_response: "No Content",
              errors: null,
            })
          )
          .catch((err) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: err,
            });
          });
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },
};
