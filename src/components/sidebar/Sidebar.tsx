import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import CircleIcon from "@mui/icons-material/Circle";
import useWebSocket from "react-use-websocket";

interface SidebarProps {
  onlineUsers: any[];
}
const Sidebar = (props: SidebarProps) => {
  const { onlineUsers } = props;
  // const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  // const token = localStorage.getItem("token");
  // const socket = `ws://localhost:8080/websocket?token=${token}`;

  // useWebSocket(socket, {
  //   onOpen: () => {
  //     console.log("WebSocket connection established.");
  //   },
  //   onMessage: (m) => {
  //     console.log("this is my msg", m);
  //     const newMsg = JSON.parse(m.data);
  //     console.log(newMsg, "testbest newmsg");
  //     if (newMsg.msgType === "new user join") {
  //       setOnlineUsers(JSON.parse(newMsg.values));
  //     }
  //   },
  // });

  // useEffect(() => {
  //   const setupSocket = () => {
  //     socket.addEventListener("open", () => {
  //       console.log("WebSocket connection opened");
  //       socket.send("Hello, server!");
  //     });

  //     socket.addEventListener("message", (event) => {
  //       console.log("Promijenilo se.");
  //       const users = JSON.parse(event.data);
  //       setOnlineUsers(users);
  //       console.log(onlineUsers);
  //     });

  //     socket.addEventListener("close", (event) => {
  //       console.log("event xxx: ", event);
  //       console.log("WebSocket connection closed");
  //     });
  //   };

  //   setupSocket();

  //   // Cleanup the WebSocket connection when the component unmounts
  //   return () => {
  //     //socket.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   // This effect will run whenever onlineUsers changes
  //   console.log("Online users updated:", onlineUsers);
  // }, [onlineUsers]);

  // console.log("socket", socket);
  return (
    <div>
      <div className={styles.titleWrapper}>Online</div>
      <ul className={styles.sidebarLayout}>
        {onlineUsers.map((user) => (
          <div className={styles.iconAlign}>
            <CircleIcon style={{ color: "green", fontSize: "small" }} />
            <div className={styles.sidebarContent} key={user}>
              {user}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
