import express from "express";
import {
  updateHotel,
  createHotel,
  deleteHotel,
  getSpecificHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/find/:id", getSpecificHotel);  

router.get("/htls", getHotels);
router.get("/countByCity", countByCity);
router.get("/type/countByType", countByType);
router.get("/room/:id", getHotelRooms)

export default router;
