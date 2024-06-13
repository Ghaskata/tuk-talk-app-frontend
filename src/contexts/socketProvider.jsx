import { useEffect } from "react";
import { createContext, useState } from "react";
import socketio from "socket.io-client";
import { authStore } from "./authStore";

export const SocketContext = createContext({
  chatClient: null,
  chatList: [],
  chatReaction: [],
  sendMessageEvent: () => {},
  replyMessageEvent: () => {},
  reactMessageEvent: () => {},
  editMessageEvent: () => {},
  deleteMessageEvent: () => {},
});

export const SocketContextProvider = ({ children }) => {
  const SocketURL = process.env.REACT_APP_BE_SOCKET_URL;

  const { isAuthenticated, sessionId, userData } = authStore();
  const [chatClient, setChatClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [chatReaction, setChatReaction] = useState([]);
  const [user, setUser] = useState({});

  // set connection
  // console.log("SocketURL >>>> ", SocketURL);
  // const client = socketio(SocketURL, {
  //   query: {
  //     userId: userData._id,
  //   },
  //   transports: ["websocket"],
  //   autoConnect: false,
  //   reconnection: false,
  //   forceNew: true,
  //   upgrade: true,
  // });

  // client.on("connect", function () {
  //   console.log("connected----");
  //   console.log("client >>>>", client);
  // });

  // client.connect();

  return (
    <SocketContext.Provider value={{ chatClient }}>
      {children}
    </SocketContext.Provider>
  );
};
