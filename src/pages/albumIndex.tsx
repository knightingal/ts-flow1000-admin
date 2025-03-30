import DefaultLayout from "@/layouts/default";
import { AlbumConfig, initConfig, PicDetail, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AlbumIndexPage = () => {
  const [picIndex, setPicIndex] = useState<Array<PicDetail>>([]);
  const albumConfigs = useSelector((state: RootState) => state.flow1000Config.albumConfigs);
  const albumConfigMap = new Map(albumConfigs.map(config => [config.name, config]));

  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/local1000/albumConfig/list")
      .then((resp: Response) => resp.json())
      .then((json: Array<AlbumConfig>) => {
        const albumConfigs: Array<AlbumConfig> = json;
        dispatch(initConfig({albumConfigs: albumConfigs}))
        return;
      })
      .then(() => {
        return fetch("/local1000/picIndexAjax");
      })
      .then(resp => {
        return resp.json()
      })
      .then((respJson: Array<PicDetail>) => {
        setPicIndex(respJson);
      });
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
    {picIndex.map((pic => <CoverItem key={pic.index} picDetail={pic} albumConfigMap={albumConfigMap}/>))}
  </>;
};

const CoverItem = ({picDetail, albumConfigMap}:{picDetail: PicDetail, albumConfigMap: Map<String, AlbumConfig>}) => {
  const src = `http://192.168.2.12:3002/linux1000/${albumConfigMap.get(picDetail.album)?.sourcePath}/${picDetail.name}/${picDetail.cover.replace(".bin", "")}`;
  return <img src={src}></img>
};

export default AlbumIndexPage;