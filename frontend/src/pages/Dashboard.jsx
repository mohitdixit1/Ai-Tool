import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance.js";
import Chatbox from "../components/chatbox.jsx";

const Dashboard = ({ user }) => {
  const { id } = useParams();
  const [chatId, setChatId] = useState(id || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id || !user) return;

    const createChat = async () => {
      try {
        const res = await axios.post("/chat/createNewChat", {
          userdata: { id: user._id || user.id },
        });

        if (res.data?._id) {
          setChatId(res.data._id);
          navigate(`/chat/${res.data._id}`, { replace: true });
        }
      } catch (err) {
        console.error("Failed to create new chat:", err);
      }
    };

    createChat();
  }, [id, user, navigate]);

  return chatId ? <Chatbox user={user} id={chatId} /> : <h2>Loading chat...</h2>;
};

export default Dashboard;
