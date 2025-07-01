import styles from "./SelectInput.module.css"

interface ISelectInputProps {
 name: string
 iterable: [string,number][]
 onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectInput({onChange, iterable, name}:ISelectInputProps){
    const iterableData = iterable && iterable.length > 0 ? iterable : []
    return (
        <select className={styles.select} onChange={onChange}>
            <option>{name}</option>
            {iterableData.map((iter) => (
                <option id={`${iter[1]}`} key={iter[1]}>{iter[0]}</option>
            ))}
        </select>
    )
}
