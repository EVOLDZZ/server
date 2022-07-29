import express from "express";
import Hotel from "../models/Hotel.js";
const router = express.Router();

router.post("/", createHotel);

router.put("/:id", async (req, res) => {
  try {
    const updatedHolel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHolel);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
    try {
     await Hotel.findByIdAndDelete(
        req.params.id,
      );
      res.status(200).json("Hotel deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
 
  router.get("/:id", async (req, res) => {
    try {
     const specificHotel = await Hotel.findById(
        req.params.id,
      );
      res.status(200).json(specificHotel);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/:id", async (req, res) => {

   
    try {
     const hotels = await Hotel.find(
      )
      res.status(200).json(hotels);
    } catch (error) {
next(error)
    }
  });

export default router;
