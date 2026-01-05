import styles from './ThreeDot.module.css'
import {Link} from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon.tsx";
import threeDot from "../../../../public/static/svg/threeDot.svg"
export default function ThreeDot({to}:{to:string}) {
    return <Link to={to} className={styles.link}>
      <SvgIcon svg={threeDot} alt={""} className={styles.size}/>
    </Link>

}