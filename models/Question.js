import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    input: {
      required: true,
      type: String,
      unique: true,
    },
    type: {
      required: true,
      type: String,
    },
    subheadings: [],
  },
  { timestamps: true }
);
export default mongoose.model("Question", dataSchema);
//module.exports = mongoose.model('User', dataSchema)
