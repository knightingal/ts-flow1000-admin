import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";

const AlbumIndexPage = () => {
  const [picIndex, setPicIndex] = useState<Array<PicDetail>>([]);

  useEffect(() => {
    fetch("/local1000/picIndexAjax").then(resp => {
      return resp.json()
    }).then((respJson: Array<PicDetail>) => {
      setPicIndex(respJson);
    })
  }, []);

  useEffect(() => {
    const clientWidth = document.getElementsByTagName("html")[0].clientWidth;
    console.log(`clientWidth:${clientWidth}`);

  }, [])

  // return <DefaultLayout>
  //   <h1>AlbumnIndexPage</h1>
  //   {picIndex.map((pic => <CoverItem key={pic.index} picDetail={pic}/>))}
  // </DefaultLayout>;
  return <>
    <h1>AlbumnIndexPage</h1>
    {picIndex.map((pic => <CoverItem key={pic.index} picDetail={pic}/>))}
  </>;
};

const CoverItem = ({picDetail}:{picDetail: PicDetail}) => {
  const src = `http://192.168.2.12:3002/linux1000/source/${picDetail.name}/${picDetail.cover.replace(".bin", "")}`;
  return <img src={src}></img>
};

export default AlbumIndexPage;