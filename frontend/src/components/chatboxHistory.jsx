import "../styles/chatboxHistory.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosInstance.js";

function ChatbotHistory({ user, SetAllchat, Allchat }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllChat() {
      try {
        const response = await axios.get(`/chat/AllchatForThisUser`, {
          params: { userId: user.id || user._id }, // pass ID in query
        });

        if (response.data && Array.isArray(response.data)) {
          SetAllchat(response.data);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }

    if (user) fetchAllChat();
  }, [user]);

  return (
    <div className="history">
      <Link to="/" className="new-chat">
        + New Chat
      </Link>

      <div className="chat-list">
        {Allchat.map((e) => (
          <div
            className="history-chat"
            key={e._id}
            onClick={() => navigate(`/chat/${e._id}`)}
          >
            <p>{e.ChatData[0]?.message || "Untitled Chat"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatbotHistory;
