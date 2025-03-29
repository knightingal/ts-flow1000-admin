import DefaultLayout from "@/layouts/default";
import { useEffect } from "react";

export default function AlbumIndexPage() {
  useEffect(() => {
    fetch("/local1000/picIndexAjax").then(resp => {
      return resp.json()
    }).then(respJson => {
      console.log(respJson);
    })
  }, [])


  return <DefaultLayout>
    <h1>AlbumnIndexPage</h1>
  </DefaultLayout>;
}