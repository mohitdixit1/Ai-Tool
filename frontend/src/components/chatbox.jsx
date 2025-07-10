import "../styles/dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosInstance.js";

function Chatbox({ user, id }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [Allchat, SetAllchat] = useState([]);

  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // scrolll to bottom all chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // it fetch chat history or current chat data
  useEffect(() => {
    async function fetchChatHistory() {
      try {
        const response = await axios.get(`/chat/${id}`);
        if (response.data && response.data.chatData) {
          setMessages(response.data.chatData);
        } 
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }

    fetchChatHistory();
  }, [id]);
  // it fetch previous chat history
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

  async function handleInputData(e) {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = { role: "user", message: inputMessage };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/chat/generate", {
        Data: newMessages,
        userdata: { ...user, chatId: id },
      });

      const aiResponse = { role: "Ai", message: res.data.ans };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          message: "Sorry, I couldn't get a response. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
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

      <div className="home">
        <div className="mid">
          { messages.length > 0 ? (
            <div>
              {messages.map((chatItem, index) => (
                <div key={index}>
                  {chatItem.role === "user" ? (
                    <div className="userMessage">
                      <p>{chatItem.message}</p>
                    </div>
                  ) : chatItem.role === "Ai" ? (
                    <div className="AiMessage">
                      <p>{chatItem.message}</p>
                    </div>
                  ) : (
                    <div className="errorMessage">
                      <p>Error: {chatItem.message}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1>What can I help with?</h1>
            </div>
          )}
        </div>

        <form className="input-wrapper" onSubmit={handleInputData}>
          <input
            type="text"
            placeholder="Enter something"
            className="searchbar"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={loading}
          />
          <input
            type="submit"
            value={loading ? "..." : "Send"}
            className="submit-btn"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default Chatbox;
