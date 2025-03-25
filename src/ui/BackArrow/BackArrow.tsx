import { useNavigate } from "react-router-dom";
import icons from "../../const/icons";
import styles from "./BackArrow.module.css";

const BackArrow = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${styles.iconBack} ${className}`}
      onClick={() => {
        navigate(-1);
      }}
    >
      <svg viewBox="0 0 30 30">
        <path d={icons.backArrow} fill="#FFFFFF"></path>
      </svg>
    </button>
  );
};

export default BackArrow;
