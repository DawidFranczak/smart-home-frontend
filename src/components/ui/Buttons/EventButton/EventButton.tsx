import styles from "./EventButton.module.css"
interface IEventButtonProps {
    onClick: () => void;
    className?: string;
    type: "click" | "hold"
    children: React.ReactNode
}
export default function EventButton({ onClick, className, type,children }: IEventButtonProps) {

    return <button className={`${styles[type]} ${className}`} onClick={onClick}>{children}</button>
}