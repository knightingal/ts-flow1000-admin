import { api } from "@/constants";
import DefaultLayout from "@/layouts/default";
import { AlbumConfig, initConfig, PicDetail, RootState, setWindowSize } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AlbumIndexPage = () => {
  const [picIndex, setPicIndex] = useState<Array<PicDetail>>([]);
  const albumConfigMap = useSelector((state: RootState) => state.flow1000Config.albumConfigMap);

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(api.configList)
      .then((resp: Response) => resp.json())
      .then((json: Array<AlbumConfig>) => {
        const albumConfigs: Array<AlbumConfig> = json;
        dispatch(initConfig(albumConfigs));
        return;
      })
      .then(() => {
        return fetch(api.albumList);
      })
      .then(resp => {
        return resp.json()
      })
      .then((respJson: Array<PicDetail>) => {
        setPicIndex(respJson);
      });
  }, []);

  useEffect(() => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    dispatch(setWindowSize({height, width}));
  }, []);

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