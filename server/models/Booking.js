import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema(
  {
    car:              { type: ObjectId, ref: "Car", required: true },
    user:             { type: ObjectId, ref: "User", required: true},
    owner:            { type: ObjectId, ref: "User", required: true},
    pickupDate:       { type: Date,   required: true },
    returnDate:       { type: Date,   required: true },
    paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'gcash', 'maya'],
    required: true,
    default: 'cash'
  },
    status:           { 
      type: String,   
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"], 
      default: "Pending" 
    },
    price:            { type: Number,   required: true },
    customerContact:  { type: String,   required: true },
    ownerContact:     { type: String,   required: false, default: 'Not provided' },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
