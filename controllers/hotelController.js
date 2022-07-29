import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getSpecificHotel = async (req, res, next) => {
  try {
    const specificHotel = await Hotel.findById(req.params.id);
    res.status(200).json(specificHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...rest } = req.query;
  try {
    const hotels = await Hotel.find({
      ...rest,
      cheapestPrice: { $gt: min | 1, $lt: max || 500 },
    }).limit(req.query.limit); 
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const cityList = await Promise.all(
      cities.map((city) => {
     
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(cityList);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  const types = ["hotel", "apartment", "resort", "villa", "cabin"];

  try {
    const typeList = await Promise.all(
      types.map(async (type) => {
        const count = await Hotel.countDocuments({ type: type });
        return { type, count };
      })
    );

    res.status(200).json([typeList]);
  } catch (error) {
    next(error);
  }
};
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch(error) {
    next(error);
  }
};
