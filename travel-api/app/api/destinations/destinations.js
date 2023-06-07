const Destination = require("../../models/").Destinations;

module.exports = {
  getDestinationsById(req, res) {
    return Destination.findByPk(req.params.id, {
      include: [],
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: "Not Found",
            errors: "Destination Not Found",
          });
        }
        const destination = {
          status_response: "OK",
          destination: doc,
          errors: null,
        };
        return res.status(200).send(destination);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  getDestinations(req, res) {
    return Destination.findAll({
      include: [],
      order: [["city_name", "ASC"]],
    })
      .then((docs) => {
        const destinations = {
          status_response: "OK",
          count: docs.length,
          destinations: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(destinations);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  addDestinations(req, res) {
    return Destination.create({
      city_name: req.body.city_name,
      price: req.body.price,
      from: req.body.from,
      user_id: req.userId,
    })
      .then((doc) => {
        const destinations = {
          status_response: "Created",
          destinations: doc,
          errors: null,
        };
        return res.status(201).send(destinations);
      })
      .catch((err) => [
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        }),
      ]);
  },

  updateDestinations(req, res) {
    return Destination.findByPk(req.params.id, {})
      .then((destination) => {
        if (!destination) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Status Not Found",
          });
        }
        return destination
          .update({
            city_name: req.body.city_name || destination.city_name,
            price: req.body.price || destination.price,
            from: req.body.from || destination.from,
          })
          .then((doc) => {
            const destination = {
              status_response: "OK",
              destination: doc,
              errors: null,
            };
            return res.status(200).send(destination);
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

  deleteDestination(req, res) {
    return Destination.findByPk(req.params.id)
      .then((destination) => {
        if (!destination) {
          return res.status(400).send({
            status_response: "Bad Request",
            errors: " Destination Not Found",
          });
        }

        return destination
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
