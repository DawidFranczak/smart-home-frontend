import styles from './ThreeDot.module.css'
import {Link} from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon.tsx";
import threeDot from "../../../../public/static/svg/threeDot.svg"

interface ThreeDotProps {
    to:string
    className?:string
}

export default function ThreeDot({to, className}:ThreeDotProps) {
    return <Link to={to} className={`${styles.link} ${className}`}>
      <SvgIcon svg={threeDot} alt={""} className={styles.size}/>
    </Link>

}