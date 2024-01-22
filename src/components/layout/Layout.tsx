import { ReactNode, useEffect, useState } from "react";
import styles from "./Layout.module.css";
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { ScreenWrapper } from "../screenWrapper/ScreenWrapper";
import useWebSocket from "react-use-websocket";
import { msgsAtom } from "../../atoms/msgsAtom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActiveChats from "../activeChats/ActiveChats";

interface ChildrenNode {
  children: ReactNode;
}

export const fetchData = async () => {
  try {
    let config = {
      headers: {
        Authorization: localStorage.getItem("token") as string,
      },
    };

    const response = await axios.get(
      `http://localhost:8080/api/messages/`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Layout: React.FC<ChildrenNode> = ({ children }) => {
  const [dataList, setDataList] = useRecoilState(msgsAtom);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [oldUsers, setOldUsers] = useState<string[]>([]);
  const token = localStorage.getItem("token");
  const socket = `ws://localhost:8080/websocket?token=${token}`;
  const [onlineUser, setOnlineUser] = useState<string>("");
  const getUsername = async (token: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/users/getme/${token}`
    );
    setOnlineUser(response.data);
  };

  useEffect(() => {
    if (token) {
      getUsername(token);
    }
  });

  const notify = (user: string) => toast(`${user} is now online!`);

  useWebSocket(socket, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (m) => {
      const newMsg = JSON.parse(m.data);
      if (newMsg.msgType === "new user join") {
        const updatedOnlineUsers = JSON.parse(newMsg.values);

        const newUsers = updatedOnlineUsers.filter(
          (user: string) => !oldUsers.includes(user)
        );

        setOldUsers(updatedOnlineUsers);

        let usersToNotify = newUsers.filter(
          (user: string) => user !== onlineUser
        );

        usersToNotify.forEach((user: string) => {
          console.log("New user: ", user);
          notify(user);
        });

        setOnlineUsers(updatedOnlineUsers);
      } else if (newMsg.msgType === "new message added") {
        fetchNewMsges();
      }
    },
  });

  const fetchNewMsges = async () => {
    const data = await fetchData();
    setDataList(data);
  };

  useEffect(() => {
    fetchNewMsges();
  }, []);

  return (
    <div className={styles.layoutWrapper}>
      <ToastContainer />
      <div className={styles.navWrapper}>
        <div style={{ flex: 1 }}></div>
        <div className={styles.topnavWrapper}>EvoltChat</div>
        <div className={styles.userWrapper}>Welcome, {onlineUser}!</div>
      </div>
      <ScreenWrapper>
        <div className={styles.mainWrapper}>
          <div className={styles.contentWrapper}>
            <Sidebar onlineUsers={onlineUsers} />
            <span className={styles.divider} />
            <div className={styles.childrenWrapper}>{children}</div>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default Layout;
