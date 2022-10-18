import mongoose from "mongoose";
const dataSchema = new mongoose.Schema(
  {
    roleName: {
      required: true,
      type: String,
    },
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    form: {
      ref: "Form",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Role", dataSchema);
//module.exports = mongoose.model('Role', dataSchema)
