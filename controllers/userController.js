import User from "../models/UserOld.js";


export const updateUser = async(req,res,next) =>  {
    try {
        const updatedHolel = await User.findByIdAndUpdate(
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
}
export const getSpecificUser = async(req,res,next) =>  {
    try {
        const specificUser = await User.findById(
           req.params.id,
         );
         res.status(200).json(specificUser);
       } catch (error) {
         res.status(500).json(error);
       }
}
export const deleteUser = async(req,res,next) =>  {
    try {
        await User.findByIdAndDelete(
           req.params.id,
         );
         res.status(200).json("User deleted");
       } catch (error) {
         res.status(500).json(error);
       }
}
export const getUsers = async(req,res,next) =>  {
    try {
        const Users = await User.find(
         )
         res.status(200).json(Users);
       } catch (error) {
   next(error)
       }
}