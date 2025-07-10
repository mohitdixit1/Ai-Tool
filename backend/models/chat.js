const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  ChatData: [
    {
      role: { type: String },
      message: { type: String },
    }
  ],
  CreatedBY: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Chatmodel = model("Chat", ChatSchema);
module.exports = Chatmodel;
