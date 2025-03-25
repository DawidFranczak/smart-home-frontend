import styles from "./Message.module.css";
interface MessageProps {
  children: React.ReactNode;
  type: string;
}

const Message = ({ children, type }: MessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.backgroundBlur}></div>
      <p className={`${styles.messageText} ${styles[type]}`}>{children}</p>
    </div>
  );
};

export default Message;
