import styles from './ThreeDot.module.css'
import {Link} from "react-router-dom";
export default function ThreeDot({to}:{to:string}) {
    return <Link to={to} className={styles.link}>
        <svg width="24" height="6" viewBox="0 0 24 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="3"/>
            <circle cx="12" cy="3" r="3"/>
            <circle cx="21" cy="3" r="3"/>
        </svg>
    </Link>

}