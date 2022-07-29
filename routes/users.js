import express from "express";
import { updateUser  , deleteUser, getSpecificUser, getUsers} from "../controllers/UserController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";


const router = express.Router();

router.get('/checkau', verifyToken, (req,res,next)=>{
    res.send("hello user, ur logged in")
})
router.get('/checkus/:id', verifyUser, (req,res,next)=>{
    res.send("hello user, ur logged in")
})

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

  router.get("/:id", verifyUser, getSpecificUser);

  router.get("/", verifyUser, getUsers);

export default router;
