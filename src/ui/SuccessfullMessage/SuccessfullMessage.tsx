import styles from "./SuccessfullMessage.module.css"
interface SuccessfullMessageProps { 
    children: React.ReactNode 
}   

const SuccessfullMessage = ({children}:SuccessfullMessageProps) => {
    return(
        <p className={styles.successfullMessage}>{children}</p>
    )
};
export default SuccessfullMessage;