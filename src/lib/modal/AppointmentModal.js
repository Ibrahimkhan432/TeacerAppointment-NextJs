import mongoose from "mongoose";
import { UserModal } from "./UserModal";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
  request: { type: mongoose.Types.ObjectId, ref: "Requests" },
  status: {
    type: String,
    default: "accepted",
    enum: ["pending", "accepted", "rejected", "reviewed", "visited", "missed"],
  },

});

export const AppointmentModal =
  mongoose.models.Appointments || mongoose.model("Appointments", appointmentSchema);