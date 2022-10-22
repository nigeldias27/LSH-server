import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    questions: [],
    user: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Submission", dataSchema);
//module.exports = mongoose.model('User', dataSchema)
