import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BackArrow from "../../../ui/BackArrow/BackArrow";
import { api } from "../../../const/api";
import styles from "./SelectAquariumPage.module.css";
import useFetch from "../../../hooks/useFetch";

const SelectAquariumPage = () => {
  // const { data, readData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAquariumData = async () => {
      // await readData(api.getAllAquarium)
    };
    getAquariumData();
  }, []);

  const nav = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      const target = event.target as HTMLButtonElement;
      navigate(`/aquarium/${target.id}/`);
    }, 500);
  };
  // if(!data){
  //     return
  // }

  // if(data.length === 1){
  //     navigate(`/aquarium/${data[0].id}/`)
  // }

  return (
    <div className={styles.container}>
      {/* <BackArrow />
            {data.map((aqua)=>{
               return <button className={styles.link} id={aqua.id} key={aqua.id} onClick={nav}>{aqua.name}</button>
            })} */}
    </div>
  );
};

export default SelectAquariumPage;
