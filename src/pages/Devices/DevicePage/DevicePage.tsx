import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { api } from "../../../const/api";

export default function DevicePage() {
  // const { isLoading, data, readData } = useFetch();

  useEffect(() => {
    // async function getData() {
    //     await readData(`${api.getDevice}`)
    // }
    // getData()
  }, []);
  return (
    <>
      <p>Hello</p>
    </>
  );
}
