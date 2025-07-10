const { Router } = require("express");
const Chat = require("../models/chat");

const router = Router();

const { generate ,createNewChat ,AllchatForThisUser,FindChatByID} = require("../controllers/chat.controllers"); 

router.post("/generate", generate); 

router.post("/createNewChat", createNewChat);



router.get("/AllchatForThisUser", AllchatForThisUser);

router.get("/:id", FindChatByID);


module.exports = router;
