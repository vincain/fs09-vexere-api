const { Station } = require("../../../../models/Station");

//getList
const getStations = (req, res, next) => {
  Station.find()
    .then((stations) => {
      res.status(200).json(stations);
    })
    .catch((err) => res.json(err));
};

//getDetail
const getStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then((stations) => {
      res.status(200).json(stations);
    })
    .catch((err) => res.json(err));
};

//add
const postStations = async (req, res, next) => {
  // const {name, address, province} = req.body

  try {
    const newStation = new Station(req.body);
    await newStation.save();
    res.status(200).send(newStation);
  } catch (err) {
    res.send(err);
  }
};

//replace
const putStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then((station) => {
      if (!station)
        return Promise.reject({
          status: 404,
          message: "Station not found",
        });

      const keys = ["name", "address", "province"];
      keys.forEach((key) => {
        station[key] = req.body[key];
      });

      return station.save();
    })
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

//update
const patchStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then((station) => {
      if (!station)
        return Promise.reject({
          status: 404,
          message: "Station not found",
        });

      const keys = ["name", "address", "province"];
      keys.forEach((key) => {
        station[key] = req.body[key] ? req.body[key] : station[key];
      });

      return station.save();
    })
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

//delete
const deleteStationById = (req, res, next) => {
  Station.findByIdAndDelete(req.params.id)
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

module.exports = {
  getStations,
  getStationById,
  postStations,
  putStationById,
  patchStationById,
  deleteStationById,
};
