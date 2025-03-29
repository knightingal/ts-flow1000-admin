import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";

export default function AlbumIndexPage() {
  const [picIndex, setPicIndex] = useState<Array<PicDetail>>([]);

  useEffect(() => {
    fetch("/local1000/picIndexAjax").then(resp => {
      return resp.json()
    }).then((respJson: Array<PicDetail>) => {
      setPicIndex(respJson);
    })
  }, []);


  return <DefaultLayout>
    <h1>AlbumnIndexPage</h1>
    {picIndex.map((pic => <p key={pic.index}>{pic.name}</p>))}
  </DefaultLayout>;
}