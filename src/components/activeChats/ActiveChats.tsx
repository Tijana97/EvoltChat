import styles from "./ActiveChats.module.css";

const ActiveChats = () => {
  const onlineUsers = ["tiki", "meri", "dzani"];

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.titleWrapper}>Active Chats</div>
      <ul className={styles.activeChatsLayout}>
        <div className={styles.activeChatsContent}>General</div>
        {onlineUsers.map((user) => (
          <div className={styles.activeChatsContent} key={user}>
            {user}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ActiveChats;
