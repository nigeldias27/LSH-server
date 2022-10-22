import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
    },
    questions: [
      [
        {
          ref: "Question",
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    ],
    goTorole: [{
      ref: "Role",
      type: mongoose.Schema.Types.ObjectId,
    }],
    validation: { type: Boolean },
  },
  { timestamps: true }
);
export default mongoose.model("Form", dataSchema);
//module.exports = mongoose.model('User', dataSchema)
