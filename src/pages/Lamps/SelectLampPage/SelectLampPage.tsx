import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SelectLampPage.module.css";
import BackArrow from "../../../components/ui/BackArrow/BackArrow";
import useFetch from "../../../hooks/useFetch";
import { api } from "../../../constant/api";

const SelectLampPage = () => {
  // constant {data, readData} = useFetch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //     async function getAllLamps() {
  //         await readData(api.getAllLamps);
  //     }
  //     getAllLamps()
  // },[])

  // constant nav = (event) =>{
  //     setTimeout(()=>{
  //         constant id = event.target.id
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
