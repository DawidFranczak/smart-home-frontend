import styles from "./HomeCode.module.css";
import useHomeCodeQuery from "../../hooks/queries/useHomeCodeQuery.tsx";
import LoadingAnimation from "../ui/LoadingAnimation/LoadingAnimation.tsx";
export default function HomeCode() {
  const {data, status, isLoading} = useHomeCodeQuery();
  if (isLoading || data === undefined) return <LoadingAnimation  />
  if (status === "error") return <p>Wystąpił bład</p>
  return <div className={styles.container}><p>Twój jednorazowy kod domu</p>{data.data.code}</div>;
}
