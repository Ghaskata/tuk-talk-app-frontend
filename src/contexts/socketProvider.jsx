import { useEffect } from "react";
import { createContext, useState } from "react";
import socketio from "socket.io-client";

export const SocketContext = createContext({
  chatClient: null,
  sendMessageEvent: () => {},
  replyMessageEvent: () => {},
  reactMessageEvent: () => {},
  editMessageEvent: () => {},
  deleteMessageEvent: () => {},
  //   channelList: [],
  chatList: [],
  chatReaction: [],
  //   channelInfo: {},
  membersList: [],
  channelId: null,
  setChannelId: (id) => {},
});

export const SocketContextProvider = ({ children }) => {
  const SocketURL = process.env.REACT_APP_BE_SOCKET_URL;

  const [chatClient, setChatClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [chatReaction, setChatReaction] = useState([]);
  const [user, setUser] = useState({});

  // set connection

  console.log("SocketURL >>>> ", SocketURL);
  const client = socketio(SocketURL, {
    query: {
      userId: "user____id __here__write",
    },
    transports: ["websocket"],
    autoConnect: false,
    reconnection: false,
    forceNew: true,
    upgrade: true,
  });
  
  client.on("connect", function () {
    console.log("connected----");
    console.log("client >>>>", client);
  });

  client.connect();

  return (
    <SocketContext.Provider value={{ chatClient }}>
      {children}
    </SocketContext.Provider>
  );
};
