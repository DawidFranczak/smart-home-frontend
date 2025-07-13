import styles from "./HomeCode.module.css";
export default function HomeCode() {
  const code = "1234"
  return <div className={styles.container}><p>Twój jednorazowy kod domu</p>{code}</div>;
}
