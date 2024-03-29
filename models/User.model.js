import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      ref: "Role",
      type: mongoose.Schema.Types.ObjectId,
    },
    previousSubmisson: [
      { ref: "Submission", type: mongoose.Schema.Types.ObjectId },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("User", dataSchema);
//module.exports = mongoose.model('User', dataSchema)
