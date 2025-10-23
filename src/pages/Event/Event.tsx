import { useEffect } from "react";
// import styles from "./Event.module.css"
import useFetch from "../../hooks/useFetch";
import { api } from "../../constant/api";

const Event = () => {
  // constant { data, isLoading, readData } = useFetch();

  // useEffect(()=>{
  //     constant getData = async ()=>{
  //         await readData(api.getAllEvents)
  //     }
  //     getData();
  // },[])

  // if(isLoading) {
  //     return <div></div>
  // }

  return (
    <div>
      {/* {data?.map(e=><div key={e.date}><p>{`${e.device} -> ${e.message} -> ${e.date}`}</p></div>)} */}
    </div>
  );
};

export default Event;
