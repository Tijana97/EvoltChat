import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { msgsAtom } from "../../atoms/msgsAtom";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused": {
            borderColor: "#e94258", // Customize focused border color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#e94258", // Customize focused label color
          },
        },
      },
    },
  },
});

const Home = () => {
  const dataList = useRecoilValue(msgsAtom);
  // const [dataList, setDataList] = useState([]);
  const [message, setMessage] = useState("");
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when dataList changes
    const x: any = messagesContainerRef.current;
    if (x) {
      x.scrollTop = x.scrollHeight;
    }
  }, [dataList]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    // Perform actions to send the message (e.g., make an API call)
    if (message === "") {
      console.log("Cannot send empty message");
    } else {
      try {
        const test = {
          username: localStorage.getItem("token") as string,
          message: message,
        };
        const response = await axios.post(
          `http://localhost:8080/api/messages/new`,
          {
            username: localStorage.getItem("token") as string,
            message,
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setMessage("");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.homeWrapper}>
        <div className={styles.messagesContainer} ref={messagesContainerRef}>
          {dataList.map((row: any) => (
            <div className={styles.messageWrapper} key={row.id}>
              <div className={styles.usernameWrapper}>{row.username}:</div>
              <div className={styles.contentWrapper}>{row.content}</div>
            </div>
          ))}
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            style={{
              backgroundColor: "white",
              color: "#e94258",
              borderRadius: "10px",
              width: "100%",
            }}
            InputProps={{ style: { color: "#e94258" } }}
            id="outlined-basic"
            label="Send a Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SendIcon
            style={{
              color: "#e94258",
              fontSize: "xx-large",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
