import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "ur not authenticated"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) return next(createError(403, "token is not valid"));
    req.user = user; 
    next()
  });
};

export const verifyUser =(req,res,next) => {
    verifyToken(req,res,next, () => {
         if(req.user.id === req.param.id || req.user.isAdmin){
            next() 
         }else {
            return next(createError(403, "not aut"))
         }
    })
}

export const verifyAdmin =(req,res,next) => {
    verifyToken(req,res,next, () => {
         if(req.user.isAdmin){
            next() 
         }else {
            return next(createError(403, "u dont have access to this command"))
         }
    })
}