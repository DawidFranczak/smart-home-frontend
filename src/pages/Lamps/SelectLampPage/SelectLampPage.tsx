import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SelectLampPage.module.css";
import BackArrow from "../../../ui/BackArrow/BackArrow";
import useFetch from "../../../hooks/useFetch";
import { api } from "../../../const/api";

const SelectLampPage = () => {
  // const {data, readData} = useFetch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //     async function getAllLamps() {
  //         await readData(api.getAllLamps);
  //     }
  //     getAllLamps()
  // },[])

  // const nav = (event) =>{
  //     setTimeout(()=>{
  //         const id = event.target.id
  //         navigate(`/lamp/${data[id].name}/`, {state:data[id].id});
  //     },500);
  // }

  // if(!data) return

  return (
    <div className={styles.container}>
      <BackArrow />
      {/* {data.map((lamp, index)=>{
               return <button className={styles.link} id={index} key={lamp.id} onClick={nav}>{lamp.name}</button>
            })} */}
    </div>
  );
};

export default SelectLampPage;
