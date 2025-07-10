const Chat = require("../models/chat")

const Generate = require("../controllers/generated.controllers")


const generate = async (req, res) => {
  const { Data, userdata } = req.body;

  try {
    const ans = await Generate(Data, userdata);

    const chatId = userdata.chatId;
    await Chat.findByIdAndUpdate(
      chatId,
      { $set: { ChatData: Data.concat({ role: "Ai", message: ans }) } },
      { new: true }
    );

    return res.json({
      userMessage: Data[Data.length - 1].message,
      ans,
    });
  } catch (error) {
    console.error("Error processing chat:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
};

const createNewChat = async (req, res) => {
  try {
    const { userdata } = req.body;

    if (!userdata || !userdata.id) {
      return res.status(400).json({ error: "Missing user ID in userdata" });
    }

    // Create new chat
    const chat = await Chat.create({
      CreatedBY: userdata.id,
      ChatData: [],
    });

    // Delete all other chats with empty ChatData
    await Chat.deleteMany({
      $and: [
        { ChatData: { $size: 0 } },
        { _id: { $ne: chat._id } },
      ],
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error("❌ Error in createNewChat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const FindChatByID = async (req,res)=>{
    
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id).populate("CreatedBY");
         
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json({ chatData: chat.ChatData || [] });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
}

const AllchatForThisUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const chats = await Chat.find({
      CreatedBY: userId,
      ChatData: { $exists: true, $not: { $size: 0 } } 
    }).sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error("❌ Error in AllchatForThisUser:", error.message);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
};






module.exports = { generate ,createNewChat,AllchatForThisUser,FindChatByID}
