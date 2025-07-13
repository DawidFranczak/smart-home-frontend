import styles from "./TimeRange.module.css"
import formatAquariumDate from "../../../utils/formatAquariumDate.ts";
interface ITimeRangeProps {
    start :string,
    end :string
}
export default function TimeRange({start,end}:ITimeRangeProps){
    return(
        <div className={styles.times}>
            <span className={styles.time}>{formatAquariumDate(start)}</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.time}>{formatAquariumDate(end)}</span>
        </div>
    )
}