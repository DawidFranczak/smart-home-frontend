import styles from "./RoomVisibility.module.css";

import LockUnlocked from "/static/svg/lock_unlocked.svg";
import LockLocked from "/static/svg/lock_locked.svg";

interface RoomVisibilityProps {
  visibility: "public" | "private";
  className?: string;
}

export default function RoomVisibility({
  visibility,
  className,
}: RoomVisibilityProps) {
  return (
    <img
      src={visibility === "public" ? LockUnlocked : LockLocked}
      alt="Lock"
      width="24"
      height="24"
      className={className}
    />
  );
}
