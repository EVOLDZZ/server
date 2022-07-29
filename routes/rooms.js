import express from "express";
import { createRoom, deleteRoom, getRooms, getSpecificRoom, updateRoom, updateAvailabilityRoom } from "../controllers/roomController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", verifyAdmin, updateAvailabilityRoom);

router.delete("/:id/:hotelid", deleteRoom);

router.get("/:id", getSpecificRoom);

router.get("/", getRooms);


export default router;