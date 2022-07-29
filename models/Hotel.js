import mongoose from "mongoose";


const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    type:{   // hotel cabin apparment
        type:String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },
    adress:{
        type:String,
        required: true,
    },
    distance:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    photos: {
        type:[String],
    },
    description : {
        type: String,
        required: true,
    },
    hotelRating: {
        type:Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String], // room ids child of hotel
    },
    chepestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    }


})
export default mongoose.model("Hotel", HotelSchema)

