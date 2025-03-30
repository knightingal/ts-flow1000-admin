import { api } from "@/constants";
import DefaultLayout from "@/layouts/default";
import { AlbumConfig, initConfig, PicDetail, RootState, setWindowSize } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SlotItem {
  index: number,
  scrollOffset: number,
  itemHeight: number,
  slotIndex: number,
}

class Slot {
  totalHeight: number = 0;
  slotItemList: SlotItem[] = [];
  itemByIndex(index: number): SlotItem|undefined {
    const got: SlotItem|undefined = this.slotItemList.find(item => {
      return item.index == index;
    });
    return got;
  }
}

const minSlot = (slots: Slot[]): number => {
  let min = slots[0].totalHeight;
  let index = 0;
  for (let i = 0; i < 4; i++) {
    if (slots[i].totalHeight < min) {
      min = slots[i].totalHeight;
      index = i;
    }
  }
  return index;
} 



const AlbumIndexPage = () => {
  const [picIndex, setPicIndex] = useState<Array<PicDetail>>([]);
  const albumConfigMap = useSelector((state: RootState) => state.flow1000Config.albumConfigMap);
  const width = useSelector((state: RootState) => state.flow1000Content.width);

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